const mongoose = require('mongoose');

// Content block schema - supports title, paragraph, and image blocks
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['title', 'paragraph', 'image'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: '#1f2937',
  },
  order: {
    type: Number,
    required: true,
  },
});

const jobSchema = new mongoose.Schema(
  {
    // Main job title (required)
    title: {
      type: String,
      required: [true, 'Le titre du poste est requis'],
      trim: true,
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    // Slug for URL-friendly access
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    // Short description for cards
    shortDescription: {
      type: String,
      maxlength: [300, 'La description courte ne peut pas dépasser 300 caractères'],
    },
    // Content blocks (array of title, paragraph, image blocks)
    contentBlocks: [contentBlockSchema],

    // ===== FILTER ATTRIBUTES =====
    // Location
    location: {
      type: String,
      enum: ['Montréal', 'Québec', 'Cap-Santé', 'Télétravail', 'Autre'],
      required: [true, 'Le lieu est requis'],
    },
    // Contract type
    contractType: {
      type: String,
      enum: ['CDI', 'Contrat', 'Temps partiel', 'Stage'],
      required: [true, 'Le type de contrat est requis'],
    },
    // Department/Field
    department: {
      type: String,
      enum: ['Soudage', 'Fabrication', 'Ingénierie', 'Maintenance', 'Gestion', 'Autre'],
      required: [true, 'Le département est requis'],
    },
    // Experience level
    experienceLevel: {
      type: String,
      enum: ['Junior', 'Intermédiaire', 'Senior', 'Expert'],
      default: 'Intermédiaire',
    },
    // Salary range (optional)
    salaryRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
      currency: { type: String, default: 'CAD' },
      period: { type: String, enum: ['heure', 'mois', 'année'], default: 'année' },
    },

    // Publication status
    published: {
      type: Boolean,
      default: false,
    },
    // Featured job
    featured: {
      type: Boolean,
      default: false,
    },
    // Application deadline (optional)
    deadline: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
jobSchema.pre('save', async function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);

    this.slug = `${this.slug}-${Date.now()}`;
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
