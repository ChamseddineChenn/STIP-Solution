const Quotation = require('../models/Quotation');

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Private (Admin)
exports.getQuotations = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const quotations = await Quotation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Quotation.countDocuments(filter);

    res.json({
      success: true,
      data: quotations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des demandes de devis',
      error: error.message,
    });
  }
};

// @desc    Get single quotation
// @route   GET /api/quotations/:id
// @access  Private (Admin)
exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Demande de devis non trouvée',
      });
    }

    res.json({
      success: true,
      data: quotation,
    });
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la demande de devis',
      error: error.message,
    });
  }
};

// @desc    Create quotation (from frontend form)
// @route   POST /api/quotations
// @access  Public
exports.createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);

    // Broadcast notification update
    const io = req.app.locals.io;
    if (io) {
      io.emit('notification-updated', {
        type: 'quotation',
        timestamp: new Date(),
      });
    }

    res.status(201).json({
      success: true,
      message: 'Votre demande de devis a été soumise avec succès',
      data: quotation,
    });
  } catch (error) {
    console.error('Error creating quotation:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la soumission de la demande de devis',
      error: error.message,
    });
  }
};

// @desc    Update quotation (admin)
// @route   PUT /api/quotations/:id
// @access  Private (Admin)
exports.updateQuotation = async (req, res) => {
  try {
    const { status, adminNotes, assignedTo } = req.body;

    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Demande de devis non trouvée',
      });
    }

    // Update allowed fields
    if (status) quotation.status = status;
    if (adminNotes !== undefined) quotation.adminNotes = adminNotes;
    if (assignedTo !== undefined) quotation.assignedTo = assignedTo;

    await quotation.save();

    res.json({
      success: true,
      message: 'Demande de devis mise à jour avec succès',
      data: quotation,
    });
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la demande de devis',
      error: error.message,
    });
  }
};

// @desc    Delete quotation
// @route   DELETE /api/quotations/:id
// @access  Private (Admin)
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Demande de devis non trouvée',
      });
    }

    await quotation.deleteOne();

    res.json({
      success: true,
      message: 'Demande de devis supprimée avec succès',
    });
  } catch (error) {
    console.error('Error deleting quotation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la demande de devis',
      error: error.message,
    });
  }
};

// @desc    Get quotation stats
// @route   GET /api/quotations/stats
// @access  Private (Admin)
exports.getQuotationStats = async (req, res) => {
  try {
    const stats = await Quotation.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Quotation.countDocuments();

    // Get recent quotations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCount = await Quotation.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      success: true,
      data: {
        total,
        recentCount,
        byStatus: stats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error('Error fetching quotation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message,
    });
  }
};
