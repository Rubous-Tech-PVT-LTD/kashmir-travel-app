const Itinerary = require('../models/Itinerary');

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    const allowedCategories = new Set([
      'popular',
      'daywise',
      'romantic-tour',
      'couple-tour',
      'group-tour',
      'family-tour',
      'honeymoon-packages',
      'adventure-trek',
      'couple-special',
      'spiritual-tour'
    ]);

    if (category && allowedCategories.has(category)) {
      filter.category = category;
    }

    const itineraries = await Itinerary.find(filter).sort({ createdAt: -1 }).lean();
    res.json({
      success: true,
      data: itineraries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching itineraries',
      error: error.message
    });
  }
};

// Get single itinerary
exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).lean();
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    res.json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching itinerary',
      error: error.message
    });
  }
};

// Create itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { title, description, duration, price, coverImage, category, gallery, tag, tagColor, isComingSoon, itinerary: itineraryDays = [] } = req.body;

    if (!title || !duration || !price || !coverImage) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const itinerary = new Itinerary({
      title,
      description: description || '',
      duration,
      price,
      coverImage,
      category: category || 'daywise',
      gallery: Array.isArray(gallery) ? gallery : [],
      tag: tag || '',
      tagColor: tagColor || '#2563eb',
      isComingSoon: !!isComingSoon,
      itinerary: itineraryDays
    });

    await itinerary.save();
    res.status(201).json({
      success: true,
      message: 'Itinerary created successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating itinerary',
      error: error.message
    });
  }
};

// Update itinerary details
exports.updateItinerary = async (req, res) => {
  try {
    const { title, description, duration, price, coverImage, category, gallery, tag, tagColor, isComingSoon, itinerary: itineraryDays } = req.body;
    
    const itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description: description ?? '',
        duration,
        price,
        coverImage,
        category: category || 'daywise',
        gallery: Array.isArray(gallery) ? gallery : [],
        tag: tag || '',
        tagColor: tagColor || '#2563eb',
        isComingSoon: !!isComingSoon,
        ...(Array.isArray(itineraryDays) ? { itinerary: itineraryDays } : {}),
        updatedAt: new Date()
      },
      { returnDocument: 'after' }
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      message: 'Itinerary updated successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating itinerary',
      error: error.message
    });
  }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      message: 'Itinerary deleted successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting itinerary',
      error: error.message
    });
  }
};

// Add day to itinerary
exports.addDay = async (req, res) => {
  try {
    const { day, title, activities, accommodation, meals, notes } = req.body;

    if (!day || !title || !activities || activities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Day, title, and activities are required'
      });
    }

    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const dayItem = {
      day,
      title,
      activities,
      accommodation: accommodation || 'N/A',
      meals: meals || 'N/A',
      notes: notes || ''
    };

    itinerary.itinerary.push(dayItem);
    itinerary.updatedAt = new Date();
    await itinerary.save();

    res.status(201).json({
      success: true,
      message: 'Day added successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding day',
      error: error.message
    });
  }
};

// Update day in itinerary
exports.updateDay = async (req, res) => {
  try {
    const { day, title, activities, accommodation, meals, notes } = req.body;
    const { id, dayIndex } = req.params;

    if (!day || !title || !activities || activities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Day, title, and activities are required'
      });
    }

    const itinerary = await Itinerary.findById(id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    if (dayIndex < 0 || dayIndex >= itinerary.itinerary.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day index'
      });
    }

    itinerary.itinerary[dayIndex] = {
      day,
      title,
      activities,
      accommodation: accommodation || 'N/A',
      meals: meals || 'N/A',
      notes: notes || ''
    };

    itinerary.updatedAt = new Date();
    await itinerary.save();

    res.json({
      success: true,
      message: 'Day updated successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating day',
      error: error.message
    });
  }
};

// Delete day from itinerary
exports.deleteDay = async (req, res) => {
  try {
    const { id, dayIndex } = req.params;

    const itinerary = await Itinerary.findById(id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    if (dayIndex < 0 || dayIndex >= itinerary.itinerary.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day index'
      });
    }

    itinerary.itinerary.splice(dayIndex, 1);
    itinerary.updatedAt = new Date();
    await itinerary.save();

    res.json({
      success: true,
      message: 'Day deleted successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting day',
      error: error.message
    });
  }
};
