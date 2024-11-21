const PromoCodeRequest = require('../models/PromoCodeRequest'); // Import the model

// Controller function to handle the form submission
const createPromoCodeRequest = async (req, res) => {
  try {
    const { email, fullName, reason, contactNumber, agreed } = req.body;

    // Validate the input
    if (!email || !fullName || !reason || !contactNumber || !agreed) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new promo code request
    const newRequest = new PromoCodeRequest({
      email,
      fullName,
      reason,
      contactNumber,
      requestStatus: 'Pending', // Default status
    });

    // Save the request to the database
    const savedRequest = await newRequest.save();

    // Respond with success
    res.status(201).json({ message: 'Request submitted successfully.', data: savedRequest });
  } catch (error) {
    console.error('Error creating promo code request:', error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

// Controller function to fetch all promo code requests
const getAllPromoCodeRequests = async (req, res) => {
  try {
    // Retrieve all promo code requests from the database
    const requests = await PromoCodeRequest.find();

    // Respond with the list of requests
    res.status(200).json({ message: 'Promo code requests retrieved successfully.', data: requests });
  } catch (error) {
    console.error('Error fetching promo code requests:', error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

// Controller function to update the requestStatus
const updatePromoCodeRequestStatus = async (req, res) => {
    try {
      const { id } = req.params; // Request ID from URL parameters
      const { requestStatus } = req.body; // New status from request body
  
      // Validate input
      if (!id || !requestStatus) {
        return res.status(400).json({ error: 'Request ID and new status are required.' });
      }
  
      // Update the requestStatus in the database
      const updatedRequest = await PromoCodeRequest.findByIdAndUpdate(
        id,
        { requestStatus },
        { new: true } // Return the updated document
      );
  
      // If no request is found, return an error
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Promo code request not found.' });
      }
  
      // Respond with the updated request
      res.status(200).json({ message: 'Request status updated successfully.', data: updatedRequest });
    } catch (error) {
      console.error('Error updating request status:', error);
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  };

// Export the controller functions as named exports
module.exports = {
  createPromoCodeRequest,
  getAllPromoCodeRequests,
  updatePromoCodeRequestStatus,
};
