const Settings = require('../models/Settings');

// Get current settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings document exists, create a default one
    if (!settings) {
      settings = new Settings({
        heroImages: ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80']
      });
      await settings.save();
    }

    // Migration logic for old data format
    // Mongoose will populate heroImages with the default if it was missing 
    // but if heroImage (singular) existed, we can handle it if needed.
    // However, since we just overwrote the model, it's safer to ensure it's an array.
    if (settings.heroImage && (!settings.heroImages || settings.heroImages.length === 0)) {
        settings.heroImages = [settings.heroImage];
        // We could Save here but let's just return it correctly for now 
        // to avoid side-effects on GET if not necessary.
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message
    });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const { heroImages } = req.body;
    
    if (!heroImages || !Array.isArray(heroImages) || heroImages.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'heroImages must be a non-empty array'
        });
    }

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({ heroImages });
    } else {
      settings.heroImages = heroImages;
      settings.updatedAt = new Date();
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error.message
    });
  }
};
