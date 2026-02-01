const express = require('express');
const router = express.Router();
const {
  getRecentNotifications,
  getNotificationCounts,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// All notification routes are protected
router.use(protect);

// Get recent notifications
router.get('/', getRecentNotifications);

// Get notification counts
router.get('/counts', getNotificationCounts);

module.exports = router;
