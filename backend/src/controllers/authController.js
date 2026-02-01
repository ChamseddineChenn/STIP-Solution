const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// JWT Configuration
const ACCESS_TOKEN_EXPIRY = '15m'; // Short-lived access token
const REFRESH_TOKEN_EXPIRY = '1d'; // 1 day refresh token
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 day in milliseconds

// Generate Access Token
const generateAccessToken = (adminId) => {
  return jwt.sign({ id: adminId, type: 'access' }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

// Generate Refresh Token
const generateRefreshToken = (adminId) => {
  return jwt.sign(
    { id: adminId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY },
  );
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur et mot de passe requis",
      });
    }

    // Find admin by username or email, include password field
    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
    }).select('+password +refreshToken');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides',
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Compte désactivé. Contactez un administrateur.',
      });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides',
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    // Store refresh token in database
    admin.refreshToken = refreshToken;
    admin.lastLogin = new Date();
    await admin.save();

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        admin: admin.toJSON(),
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // Clear refresh token from database
    if (req.admin) {
      await Admin.findByIdAndUpdate(req.admin._id, {
        refreshToken: null,
      });
    }

    // Clear cookie
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });

    res.json({
      success: true,
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion',
    });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with valid refresh token)
exports.refreshToken = async (req, res) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Token de rafraîchissement manquant',
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      // Clear invalid cookie
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
      });

      return res.status(401).json({
        success: false,
        message: 'Token de rafraîchissement invalide ou expiré',
      });
    }

    // Find admin and verify refresh token matches
    const admin = await Admin.findById(decoded.id).select('+refreshToken');

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Token de rafraîchissement invalide',
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Compte désactivé',
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(admin._id);

    // Optionally rotate refresh token for extra security
    const newRefreshToken = generateRefreshToken(admin._id);
    admin.refreshToken = newRefreshToken;
    await admin.save();

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du rafraîchissement du token',
    });
  }
};

// @desc    Verify access token and get current admin
// @route   GET /api/auth/verify
// @access  Private
exports.verify = async (req, res) => {
  try {
    // req.admin is set by the auth middleware
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrateur non trouvé',
      });
    }

    res.json({
      success: true,
      data: {
        admin: admin.toJSON(),
      },
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification',
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe requis',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
      });
    }

    // Get admin with password
    const admin = await Admin.findById(req.admin._id).select('+password');

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect',
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de mot de passe',
    });
  }
};
