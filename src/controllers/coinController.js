const Coin = require("../models/Coins"); // Adjust the path to your Coin model

exports.getCoinsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the coin record by email
    const coinRecord = await Coin.findOne({ email });

    if (!coinRecord) {
      return res.status(404).json({
        success: false,
        message: "No record found for the provided email.",
      });
    }

    // Return the coins value
    res.status(200).json({
      success: true,
      email: coinRecord.email,
      coins: coinRecord.coins,
    });
  } catch (error) {
    console.error("Error fetching coins:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while retrieving coins. Please try again later.",
    });
  }
};

exports.updateCoinsByEmail = async (req, res) => {
  const { email } = req.params; // Extract email from URL parameters
  const { coins } = req.body;  // Extract the coins value from the request body

  if (typeof coins !== "number" || coins < 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid coins value. It must be a non-negative number.",
    });
  }

  try {
    // Find the coin record by email and update its coins value
    const updatedCoinRecord = await Coin.findOneAndUpdate(
      { email },
      { $set: { coins } }, // Update the coins field
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedCoinRecord) {
      return res.status(404).json({
        success: false,
        message: "No record found for the provided email.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coins updated successfully.",
      email: updatedCoinRecord.email,
      coins: updatedCoinRecord.coins,
    });
  } catch (error) {
    console.error("Error updating coins:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating coins. Please try again later.",
    });
  }
};
