const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protect routes - verify access token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé - Token manquant',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check token type
      if (decoded.type !== 'access') {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé - Type de token invalide',
        });
      }

      // Get admin from database
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé - Administrateur non trouvé',
        });
      }

      if (!admin.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Compte désactivé',
        });
      }

      // Attach admin to request
      req.admin = admin;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé - Token expiré',
          expired: true,
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Non autorisé - Token invalide',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur de serveur',
    });
  }
};

// Optional auth - doesn't fail if no token, but attaches admin if valid
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type === 'access') {
          const admin = await Admin.findById(decoded.id);
          if (admin && admin.isActive) {
            req.admin = admin;
          }
        }
      } catch (error) {
        // Token invalid, but that's okay for optional auth
      }
    }

    next();
  } catch (error) {
    next();
  }
};

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé',
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé - Permissions insuffisantes',
      });
    }

    next();
  };
};
