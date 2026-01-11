const Job = require('../models/Job');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Admin)
const createJob = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      contentBlocks,
      location,
      contractType,
      department,
      experienceLevel,
      salaryRange,
      published,
      featured,
      deadline,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Le titre du poste est requis',
      });
    }

    if (!location || !contractType || !department) {
      return res.status(400).json({
        success: false,
        message: 'Le lieu, type de contrat et département sont requis',
      });
    }

    const job = await Job.create({
      title,
      shortDescription,
      contentBlocks: contentBlocks || [],
      location,
      contractType,
      department,
      experienceLevel: experienceLevel || 'Intermédiaire',
      salaryRange: salaryRange || { min: null, max: null, currency: 'CAD', period: 'année' },
      published: published || false,
      featured: featured || false,
      deadline: deadline || null,
    });

    res.status(201).json({
      success: true,
      message: 'Offre d\'emploi créée avec succès',
      data: job,
    });
  } catch (error) {
    console.error('Erreur création job:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'offre d\'emploi',
      error: error.message,
    });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    const { 
      published, 
      location, 
      contractType, 
      department, 
      experienceLevel,
      featured,
      limit = 20, 
      page = 1 
    } = req.query;

    const query = {};
    
    if (published !== undefined) {
      query.published = published === 'true';
    }
    if (location && location !== 'all') {
      query.location = location;
    }
    if (contractType && contractType !== 'all') {
      query.contractType = contractType;
    }
    if (department && department !== 'all') {
      query.department = department;
    }
    if (experienceLevel && experienceLevel !== 'all') {
      query.experienceLevel = experienceLevel;
    }
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    const jobs = await Job.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: jobs,
    });
  } catch (error) {
    console.error('Erreur récupération jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des offres d\'emploi',
      error: error.message,
    });
  }
};

// @desc    Get single job by ID or slug
// @route   GET /api/jobs/:identifier
// @access  Public
const getJob = async (req, res) => {
  try {
    const { identifier } = req.params;

    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    const job = isObjectId
      ? await Job.findById(identifier)
      : await Job.findOne({ slug: identifier });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Offre d\'emploi non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Erreur récupération job:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'offre d\'emploi',
      error: error.message,
    });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const job = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Offre d\'emploi non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Offre d\'emploi mise à jour avec succès',
      data: job,
    });
  } catch (error) {
    console.error('Erreur mise à jour job:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'offre d\'emploi',
      error: error.message,
    });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Offre d\'emploi non trouvée',
      });
    }

    // Delete images from Cloudinary
    const imagesToDelete = [];

    job.contentBlocks.forEach((block) => {
      if (block.type === 'image' && block.publicId) {
        imagesToDelete.push(block.publicId);
      }
    });

    // Delete all images from Cloudinary
    for (const publicId of imagesToDelete) {
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image Cloudinary supprimée: ${publicId}`);
      } catch (err) {
        console.error(`Erreur suppression image Cloudinary ${publicId}:`, err);
      }
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Offre d\'emploi supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur suppression job:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'offre d\'emploi',
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
