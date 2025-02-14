const voucher = require("../models/voucher"); // Adjust the path to the voucher model

// Controller to get voucher data for a specific user by email
exports.getVouchers = async (req, res) => {
  const { email } = req.params; // Assuming you're passing the email as a URL parameter

  try {
    // Find the voucher document for the provided email
    const voucherData = await voucher.findOne({ email });

    if (!voucherData) {
      return res.status(404).json({
        success: false,
        message: "Voucher data not found for this email",
      });
    }

    // Return the vouchers value
    res.status(200).json({
      success: true,
      vouchers: voucherData.vouchers, // The vouchers value for the user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching voucher data",
    });
  }
};
