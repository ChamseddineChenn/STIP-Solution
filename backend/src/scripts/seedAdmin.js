/**
 * Seed script to create initial admin user
 * Run with: node src/scripts/seedAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@stip.ca',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@2024!',
      name: 'Administrateur STIP',
      role: 'superadmin',
      isActive: true,
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('='.repeat(40));
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log(
      'Password:',
      process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@2024!',
    );
    console.log('Role:', admin.role);
    console.log('='.repeat(40));
    console.log(
      '\n⚠️  IMPORTANT: Change the default password after first login!\n',
    );

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
