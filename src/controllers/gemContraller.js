const gem = require("../models/gems"); // Adjust the path as needed

// Controller to get all gems for a specific user
exports.getAllGems = async (req, res) => {
  const { email } = req.params; // Assuming you're passing the email in the request parameters
  
  try {
    // Find the gem document for the provided email
    const gemData = await gem.findOne({ email });

    if (!gemData) {
      return res.status(404).json({
        success: false,
        message: "Gem data not found for this email",
      });
    }

    // Return the allGems value from the virtual field
    res.status(200).json({
      success: true,
      allGems: gemData.allGems, // Virtual field that adds freeGems and ActualGems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching gems",
    });
  }
};
