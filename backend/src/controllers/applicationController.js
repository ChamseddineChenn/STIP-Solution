const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new job application
// @route   POST /api/applications
// @access  Public
const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      location,
      coverLetter,
      linkedIn,
      portfolio,
    } = req.body;

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis',
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Offre d'emploi non trouvée",
      });
    }

    // Check if CV was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Le CV est requis',
      });
    }

    const application = await JobApplication.create({
      job: jobId,
      firstName,
      lastName,
      email,
      phone,
      location,
      cv: {
        url: req.file.path,
        publicId: req.file.filename,
        filename: req.file.originalname,
      },
      coverLetter: coverLetter || '',
      linkedIn: linkedIn || '',
      portfolio: portfolio || '',
    });

    // Broadcast notification update
    const io = req.app.locals.io;
    if (io) {
      io.emit('notification-updated', {
        type: 'application',
        timestamp: new Date(),
      });
    }

    res.status(201).json({
      success: true,
      message: 'Candidature envoyée avec succès',
      data: application,
    });
  } catch (error) {
    console.error('Erreur création candidature:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de la candidature",
      error: error.message,
    });
  }
};

// @desc    Get all applications (admin)
// @route   GET /api/applications
// @access  Private (Admin)
const getAllApplications = async (req, res) => {
  try {
    const { jobId, status, limit = 20, page = 1 } = req.query;

    const query = {};
    if (jobId) {
      query.job = jobId;
    }
    if (status && status !== 'all') {
      query.status = status;
    }

    const applications = await JobApplication.find(query)
      .populate('job', 'title location contractType')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await JobApplication.countDocuments(query);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: applications,
    });
  } catch (error) {
    console.error('Erreur récupération candidatures:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des candidatures',
      error: error.message,
    });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private (Admin)
const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findById(id).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Candidature non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Erreur récupération candidature:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la candidature',
      error: error.message,
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Admin)
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true, runValidators: true },
    ).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Candidature non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Candidature mise à jour avec succès',
      data: application,
    });
  } catch (error) {
    console.error('Erreur mise à jour candidature:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la candidature',
      error: error.message,
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (Admin)
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Candidature non trouvée',
      });
    }

    // Delete CV from Cloudinary
    if (application.cv?.publicId) {
      try {
        await cloudinary.uploader.destroy(application.cv.publicId, {
          resource_type: 'raw',
        });
        console.log(`CV Cloudinary supprimé: ${application.cv.publicId}`);
      } catch (err) {
        console.error('Erreur suppression CV Cloudinary:', err);
      }
    }

    await JobApplication.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Candidature supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur suppression candidature:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la candidature',
      error: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
