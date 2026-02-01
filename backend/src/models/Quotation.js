const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    // Step 1: Contact Information
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
      required: [true, "L'email est requis"],
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
    company: {
      type: String,
      required: [true, "Le nom de l'entreprise est requis"],
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },

    // Step 2: Project Details
    projectType: {
      type: String,
      required: [true, 'Le type de projet est requis'],
      trim: true,
    },
    projectDescription: {
      type: String,
      required: [true, 'La description du projet est requise'],
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, 'Le délai est requis'],
      trim: true,
    },
    budgetRange: {
      type: String,
      required: [true, "L'étendue du budget est requise"],
      trim: true,
    },
    materials: {
      type: String,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },

    // Step 3: Technical Specifications
    drawingsAvailable: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no',
    },
    cadFiles: {
      type: String,
      default: 'no',
    },
    qualityStandards: {
      type: [String],
      default: [],
    },
    certificationsRequired: {
      type: [String],
      default: [],
    },

    // Step 4: Logistics & Support
    deliveryLocation: {
      type: String,
      trim: true,
    },
    installationRequired: {
      type: String,
      enum: ['yes', 'no', 'maybe'],
      default: 'no',
    },
    ongoingSupport: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no',
    },
    preferredContact: {
      type: String,
      enum: ['email', 'phone', 'video', 'in-person'],
      default: 'email',
    },

    // Terms
    subscribeUpdates: {
      type: Boolean,
      default: false,
    },

    // Admin fields
    status: {
      type: String,
      enum: [
        'Nouvelle',
        'En cours de traitement',
        'Devis envoyé',
        'Contacté',
        'Accepté',
        'Refusé',
        'Annulé',
      ],
      default: 'Nouvelle',
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for searching
quotationSchema.index({ email: 1 });
quotationSchema.index({ company: 1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Quotation', quotationSchema);
