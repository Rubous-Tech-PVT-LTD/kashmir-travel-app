const mongoose = require('mongoose');
require('dotenv').config();

const Settings = require('./models/Settings');

async function checkSettings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Atlas');
    const settings = await Settings.findOne();
    if (settings) {
      console.log('Settings Found!');
      console.log('Banners:', settings.heroImages);
    } else {
      console.log('No Settings record found on Atlas.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkSettings();
