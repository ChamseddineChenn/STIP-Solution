const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getAllJobs);
router.get('/:identifier', getJob);

// Admin routes (would normally have auth middleware)
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

// Image upload for jobs (reuse the same endpoint pattern)
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucune image fournie',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image téléchargée avec succès',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });
  } catch (error) {
    console.error('Erreur upload image:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors du téléchargement de l'image",
      error: error.message,
    });
  }
});

module.exports = router;
