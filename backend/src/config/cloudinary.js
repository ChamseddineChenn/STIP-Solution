const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary - ensure env vars are loaded
const configCloudinary = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = String(process.env.CLOUDINARY_API_KEY);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('⚠️  Cloudinary credentials not fully configured');
    console.warn(`Cloud Name: ${cloudName ? '✓' : '✗'}`);
    console.warn(`API Key: ${apiKey && apiKey !== 'your_api_key' ? '✓' : '✗'}`);
    console.warn(`API Secret: ${apiSecret ? '✓' : '✗'}`);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

// Call config immediately
configCloudinary();

// Configure Multer storage for Cloudinary (images)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'stip-blogs',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    };
  },
});

// Configure Multer storage for CV uploads (PDFs and documents)
const cvStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'stip-cvs',
      resource_type: 'raw', // For non-image files like PDFs
      allowed_formats: ['pdf', 'doc', 'docx'],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadCV = multer({
  storage: cvStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for CVs
});

module.exports = { cloudinary, upload, uploadCV, configCloudinary };
