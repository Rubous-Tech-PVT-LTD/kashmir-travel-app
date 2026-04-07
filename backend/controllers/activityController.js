const activities = require('../data/activities');

exports.getAllActivities = async (req, res) => {
  try {
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
};

exports.getActivityBySlug = async (req, res) => {
  try {
    const activity = activities.find((item) => item.slug === req.params.slug);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    return res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error.message
    });
  }
};
