const express = require('express');
const router = express.Router();
const {
  getQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  getQuotationStats,
} = require('../controllers/quotationController');

// Stats route (must be before :id route)
router.get('/stats', getQuotationStats);

// CRUD routes
router.route('/').get(getQuotations).post(createQuotation);

router
  .route('/:id')
  .get(getQuotation)
  .put(updateQuotation)
  .delete(deleteQuotation);

module.exports = router;
