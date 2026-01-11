const express = require('express');
const router = express.Router();
const {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');
const { uploadCV } = require('../config/cloudinary');

// Public routes
router.post('/', uploadCV.single('cv'), createApplication);

// Admin routes (would normally have auth middleware)
router.get('/', getAllApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
