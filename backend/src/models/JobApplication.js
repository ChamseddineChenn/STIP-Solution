const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    // Reference to the job
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'La référence du poste est requise'],
    },
    // Applicant information
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
      maxlength: [100, 'Le prénom ne peut pas dépasser 100 caractères'],
    },
    lastName: {
      type: String,
      required: [true, 'Le nom de famille est requis'],
      trim: true,
      maxlength: [100, 'Le nom de famille ne peut pas dépasser 100 caractères'],
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez fournir une adresse email valide',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Le numéro de téléphone est requis'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'La localisation est requise'],
      trim: true,
    },
    // CV file (stored in Cloudinary)
    cv: {
      url: {
        type: String,
        required: [true, 'Le CV est requis'],
      },
      publicId: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
      },
    },
    // Cover letter (optional)
    coverLetter: {
      type: String,
      maxlength: [5000, 'La lettre de motivation ne peut pas dépasser 5000 caractères'],
    },
    // LinkedIn profile (optional)
    linkedIn: {
      type: String,
      trim: true,
    },
    // Portfolio URL (optional)
    portfolio: {
      type: String,
      trim: true,
    },
    // Application status
    status: {
      type: String,
      enum: ['Nouvelle', 'En cours de révision', 'Entretien planifié', 'Acceptée', 'Refusée'],
      default: 'Nouvelle',
    },
    // Notes from admin (internal)
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
jobApplicationSchema.index({ job: 1, createdAt: -1 });
jobApplicationSchema.index({ email: 1 });
jobApplicationSchema.index({ status: 1 });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
