const rewards = require("../models/rewardPoints"); // Adjust the path to the rewards model

// Controller to get reward points for a specific user by email
exports.getPoints = async (req, res) => {
  const { email } = req.params; // Assuming you're passing the email as a URL parameter

  try {
    // Find the rewards document for the provided email
    const rewardsData = await rewards.findOne({ email });

    if (!rewardsData) {
      return res.status(404).json({
        success: false,
        message: "Rewards data not found for this email",
      });
    }

    // Return the points value
    res.status(200).json({
      success: true,
      points: rewardsData.points, // The points value for the user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching rewards data",
    });
  }
};
