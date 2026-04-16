const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Admin = require('../models/Admin');

// Admin credentials should be passed via environment variables for security
const ADMIN_USERNAME = process.env.TEMP_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.TEMP_ADMIN_PASSWORD;

async function seedAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully.');

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Update or create admin
    const admin = await Admin.findOneAndUpdate(
      { username: ADMIN_USERNAME.toLowerCase().trim() },
      { 
        username: ADMIN_USERNAME.toLowerCase().trim(),
        password: hashedPassword,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    console.log(`Admin user ${admin.username} has been seeded/updated successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
