const express = require('express');
const {
  subscribe,
  getAllSubscribers,
  getStats,
  unsubscribe,
  reactivate,
  deleteSubscriber,
  exportSubscribers,
} = require('../controllers/newsletterController');

const router = express.Router();

// Public routes
router.post('/subscribe', subscribe);

// Admin routes (add auth middleware when implemented)
// Define specific routes BEFORE dynamic :id routes
router.get('/stats', getStats);
router.get('/export', exportSubscribers);
router.get('/', getAllSubscribers);
router.put('/:id/unsubscribe', unsubscribe);
router.put('/:id/reactivate', reactivate);
router.delete('/:id', deleteSubscriber);

module.exports = router;
