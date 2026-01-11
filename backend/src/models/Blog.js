const mongoose = require('mongoose');

// Content block schema - supports title, paragraph, and image blocks
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['title', 'paragraph', 'image'],
    required: true,
  },
  content: {
    type: String, // For title and paragraph: the text content; For image: the Cloudinary URL
    required: true,
  },
  publicId: {
    type: String, // Cloudinary public ID for images (for deletion)
    default: null,
  },
  color: {
    type: String, // Color hex value for title blocks
    default: '#1f2937',
  },
  order: {
    type: Number,
    required: true,
  },
});

const blogSchema = new mongoose.Schema(
  {
    // Main blog title (required)
    mainTitle: {
      type: String,
      required: [true, 'Le titre principal est requis'],
      trim: true,
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    // Slug for URL-friendly access
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    // Cover image (optional)
    coverImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    // Content blocks (array of title, paragraph, image blocks)
    contentBlocks: [contentBlockSchema],
    // Category (mandatory)
    category: {
      type: String,
      enum: [
        'Soudage',
        'Maintenance Industrielle',
        'Nettoyage Industriel',
        'Fabrication Personnalisée',
        'Inspection 3D',
        'Peinture et Sablage',
        "Location de Main d'œuvre",
        'Assemblage',
        'Autre',
      ],
      required: [true, 'La catégorie est requise'],
    },
    // Meta information
    author: {
      type: String,
      default: 'STIP Solutions',
    },
    // Publication status
    published: {
      type: Boolean,
      default: false,
    },
    // SEO meta description
    metaDescription: {
      type: String,
      maxlength: [
        300,
        'La description méta ne peut pas dépasser 300 caractères',
      ],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Generate slug from mainTitle before saving
blogSchema.pre('save', async function () {
  if (this.isModified('mainTitle') || !this.slug) {
    this.slug = this.mainTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .substring(0, 100); // Limit length

    // Add timestamp to ensure uniqueness
    this.slug = `${this.slug}-${Date.now()}`;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
