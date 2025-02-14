const timeCurency = require("../models/timeCurency"); // Adjust the path to your model

// Controller to get time currency (hours and minutes) for a specific user by email
exports.getTimeCurrency = async (req, res) => {
  const { email } = req.params; // Email passed as a URL parameter

  try {
    // Find the document by email
    const timeData = await timeCurency.findOne({ email });

    if (!timeData) {
      return res.status(404).json({
        success: false,
        message: "Time currency data not found for this email",
      });
    }

    // Return hours and minutes
    res.status(200).json({
      success: true,
      hours: timeData.timeCurencys.hours,
      minutes: timeData.timeCurencys.minutes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching time currency data",
    });
  }
};
