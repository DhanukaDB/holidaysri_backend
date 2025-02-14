const Diamond = require("../models/diamond");

exports.getDiamondsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the diamond record by email
    const diamondRecord = await Diamond.findOne({ email });

    if (!diamondRecord) {
      return res.status(404).json({
        success: false,
        message: "No record found for the provided email.",
      });
    }

    // Return the diamonds value
    res.status(200).json({
      success: true,
      email: diamondRecord.email,
      diamonds: diamondRecord.diamonds,
    });
  } catch (error) {
    console.error("Error fetching diamonds:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while retrieving diamonds. Please try again later.",
    });
  }
};
