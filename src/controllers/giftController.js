const Gift = require("../models/gift");

// Get gifts by email
exports.getGiftsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const giftData = await Gift.findOne({ email });

    if (giftData) {
      res.status(200).json({
        success: true,
        gifts: giftData.gifts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Gifts not found for this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching gifts",
      error: error.message,
    });
  }
};
