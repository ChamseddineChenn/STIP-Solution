const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribe = async (req, res) => {
  try {
    const { email, source = 'website' } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir une adresse email',
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Cette adresse email est déjà inscrite à notre newsletter',
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();

        // Broadcast notification update
        const io = req.app.locals.io;
        if (io) {
          io.emit('notification-updated', {
            type: 'newsletter',
            timestamp: new Date(),
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Votre abonnement a été réactivé avec succès!',
        });
      }
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({
      email,
      source,
    });

    // Broadcast notification update
    const io = req.app.locals.io;
    if (io) {
      io.emit('notification-updated', {
        type: 'newsletter',
        timestamp: new Date(),
      });
    }

    res.status(201).json({
      success: true,
      message:
        'Merci pour votre inscription! Vous recevrez bientôt nos dernières nouvelles.',
      data: {
        id: subscriber._id,
        email: subscriber.email,
      },
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cette adresse email est déjà inscrite à notre newsletter',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    });
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
const getAllSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 20, active, search } = req.query;

    const query = {};

    // Filter by active status
    if (active !== undefined) {
      query.isActive = active === 'true';
    }

    // Search by email
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [subscribers, total] = await Promise.all([
      Newsletter.find(query)
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Newsletter.countDocuments(query),
    ]);

    const totalActive = await Newsletter.countDocuments({ isActive: true });
    const totalInactive = await Newsletter.countDocuments({ isActive: false });

    res.status(200).json({
      success: true,
      data: subscribers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
      stats: {
        total,
        active: totalActive,
        inactive: totalInactive,
      },
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
    });
  }
};

// @desc    Get newsletter stats
// @route   GET /api/newsletter/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const [total, active, inactive, thisMonth, thisWeek] = await Promise.all([
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ isActive: true }),
      Newsletter.countDocuments({ isActive: false }),
      Newsletter.countDocuments({
        subscribedAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }),
      Newsletter.countDocuments({
        subscribedAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    // Get subscribers by source
    const bySource = await Newsletter.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        thisMonth,
        thisWeek,
        bySource: bySource.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter stats',
    });
  }
};

// @desc    Unsubscribe from newsletter (deactivate)
// @route   PUT /api/newsletter/:id/unsubscribe
// @access  Private/Admin
const unsubscribe = async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Subscriber has been unsubscribed',
      data: subscriber,
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe',
    });
  }
};

// @desc    Reactivate subscriber
// @route   PUT /api/newsletter/:id/reactivate
// @access  Private/Admin
const reactivate = async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }

    subscriber.isActive = true;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Subscriber has been reactivated',
      data: subscriber,
    });
  } catch (error) {
    console.error('Reactivate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reactivate subscriber',
    });
  }
};

// @desc    Delete subscriber permanently
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber has been permanently deleted',
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscriber',
    });
  }
};

// @desc    Export subscribers as CSV
// @route   GET /api/newsletter/export
// @access  Private/Admin
const exportSubscribers = async (req, res) => {
  try {
    const { active } = req.query;
    const query = active !== undefined ? { isActive: active === 'true' } : {};

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .select('email subscribedAt isActive source');

    // Create CSV content
    const csvHeader = 'Email,Subscribed Date,Status,Source\n';
    const csvBody = subscribers
      .map(
        (sub) =>
          `${sub.email},${sub.subscribedAt.toISOString()},${
            sub.isActive ? 'Active' : 'Inactive'
          },${sub.source}`,
      )
      .join('\n');

    const csv = csvHeader + csvBody;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=newsletter-subscribers-${
        new Date().toISOString().split('T')[0]
      }.csv`,
    );
    res.status(200).send(csv);
  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export subscribers',
    });
  }
};

module.exports = {
  subscribe,
  getAllSubscribers,
  getStats,
  unsubscribe,
  reactivate,
  deleteSubscriber,
  exportSubscribers,
};
