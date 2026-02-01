const Quotation = require('../models/Quotation');
const JobApplication = require('../models/JobApplication');
const Newsletter = require('../models/Newsletter');

// Helper function to broadcast notification update
const broadcastNotificationUpdate = (req) => {
  const io = req.app.locals.io;
  if (io) {
    io.emit('notification-updated', { timestamp: new Date() });
  }
};

/**
 * Get recent notifications (latest quotations, applications, and newsletter subs)
 * @route GET /api/notifications
 * @access Private (Admin)
 */
exports.getRecentNotifications = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent quotations
    const quotations = await Quotation.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('firstName lastName email createdAt status')
      .lean();

    // Get recent job applications
    const applications = await JobApplication.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('job', 'title')
      .select('firstName lastName email createdAt status job')
      .lean();

    // Get recent newsletter subscriptions
    const newsletters = await Newsletter.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('email createdAt isActive')
      .lean();

    // Combine and format notifications
    const notifications = [];

    quotations.forEach((q) => {
      notifications.push({
        id: q._id,
        type: 'quotation',
        title: 'Nouvelle demande de soumission',
        message: `${q.firstName} ${q.lastName}`,
        email: q.email,
        status: q.status,
        createdAt: q.createdAt,
        link: '/quotations',
      });
    });

    applications.forEach((a) => {
      notifications.push({
        id: a._id,
        type: 'application',
        title: 'Nouvelle candidature',
        message: `${a.firstName} ${a.lastName}${a.job ? ` - ${a.job.title}` : ''}`,
        email: a.email,
        status: a.status,
        createdAt: a.createdAt,
        link: '/applications',
      });
    });

    newsletters.forEach((n) => {
      notifications.push({
        id: n._id,
        type: 'newsletter',
        title: 'Nouvel abonné newsletter',
        message: n.email,
        email: n.email,
        status: n.isActive ? 'active' : 'inactive',
        createdAt: n.createdAt,
        link: '/newsletter',
      });
    });

    // Sort by date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Take only the most recent ones
    const recentNotifications = notifications.slice(0, limit);

    // Count unread (only items with 'new'/'pending' status)
    const unreadCount = recentNotifications.filter(
      (n) => n.status === 'new' || n.status === 'pending',
    ).length;

    res.status(200).json({
      success: true,
      data: {
        notifications: recentNotifications,
        unreadCount,
        total: notifications.length,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des notifications',
      error: error.message,
    });
  }
};

/**
 * Get notification counts by type
 * @route GET /api/notifications/counts
 * @access Private (Admin)
 */
exports.getNotificationCounts = async (req, res) => {
  try {
    // Count only new/pending items
    const [quotationCount, applicationCount, newsletterCount] =
      await Promise.all([
        Quotation.countDocuments({
          status: { $in: ['new', 'pending'] },
        }),
        JobApplication.countDocuments({
          status: { $in: ['new', 'pending'] },
        }),
        Newsletter.countDocuments({
          isActive: true,
          status: { $in: ['new', 'pending'] },
        }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        quotations: quotationCount,
        applications: applicationCount,
        newsletters: newsletterCount,
        total: quotationCount + applicationCount + newsletterCount,
      },
    });
  } catch (error) {
    console.error('Error fetching notification counts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des compteurs',
      error: error.message,
    });
  }
};
