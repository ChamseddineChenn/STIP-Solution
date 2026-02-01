const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  refreshToken,
  verify,
  changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/verify', protect, verify);
router.put('/change-password', protect, changePassword);

module.exports = router;
