const token = require("../models/tokens"); // Adjust the path as needed

// Controller to get all tokens for a specific user
exports.getAllTokens = async (req, res) => {
  const { email } = req.params; // Assuming you're passing the email in the request parameters
  
  try {
    // Find the token document for the provided email
    const tokenData = await token.findOne({ email });

    if (!tokenData) {
      return res.status(404).json({
        success: false,
        message: "Token data not found for this email",
      });
    }

    // Return the allTokens value from the virtual field
    res.status(200).json({
      success: true,
      allTokens: tokenData.allTokens, // Virtual field that adds all token types
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching token data",
    });
  }
};
