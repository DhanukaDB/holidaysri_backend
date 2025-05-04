const FoodAdvertisement = require('../models/foodsnew');

// Create a new food advertisement
exports.createFoodAdvertisement = async (req, res) => {
    try {
      const {
        foodName,
        description,
        images,
        category,
        type,
        location,
        contact,
        delivery,
        priceRange,
        available,
        dineIn,
        takeAway,
        adsTimeFrame,
        price,
        agentOptions,
        userEmail,
        promocode, // Added this to destructuring
      } = req.body;
  
      // Calculate expiration date based on adsTimeFrame
      const expirationDate = new Date();
      if (adsTimeFrame === 'Monthly') {
        expirationDate.setMonth(expirationDate.getMonth() + 1);
      } else {
        expirationDate.setDate(expirationDate.getDate() + 1);
      }
  
      // Create new food advertisement
      const newAdvertisement = new FoodAdvertisement({
        title: "Food Advertisement",
        foodName,
        description,
        images,
        category,
        type,
        location,
        contact,
        delivery,
        priceRange,
        available,
        dineIn,
        takeAway,
        adsTimeFrame,
        price,
        agentOptions: agentOptions || {
          openForAgent: false,
          discountRate: 0,
          earnRate: 0
        },
        expirationDate,
        userEmail,
        promocodeUsed: promocode || null, // Explicitly adding it here
        // Other fields will use their defaults
      });
  
      // Save to database
      const savedAdvertisement = await newAdvertisement.save();
  
      res.status(201).json({
        success: true,
        message: 'Food advertisement created successfully',
        data: savedAdvertisement
      });
  
    } catch (error) {
      console.error('Error creating food advertisement:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create food advertisement',
        error: error.message
      });
    }
  };

// Get all food advertisements
exports.getAllFoodAdvertisements = async (req, res) => {
  try {
    const advertisements = await FoodAdvertisement.find({ isActive: true });
    res.status(200).json({
      success: true,
      count: advertisements.length,
      data: advertisements
    });
  } catch (error) {
    console.error('Error fetching food advertisements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food advertisements',
      error: error.message
    });
  }
};

// Get single food advertisement by ID
exports.getFoodAdvertisementById = async (req, res) => {
  try {
    const advertisement = await FoodAdvertisement.findById(req.params.id);
    
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: 'Food advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: advertisement
    });
  } catch (error) {
    console.error('Error fetching food advertisement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food advertisement',
      error: error.message
    });
  }
};

// Update food advertisement
exports.updateFoodAdvertisement = async (req, res) => {
  try {
    const updatedAdvertisement = await FoodAdvertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).json({
        success: false,
        message: 'Food advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food advertisement updated successfully',
      data: updatedAdvertisement
    });
  } catch (error) {
    console.error('Error updating food advertisement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update food advertisement',
      error: error.message
    });
  }
};

// Delete food advertisement (soft delete)
exports.deleteFoodAdvertisement = async (req, res) => {
  try {
    const deletedAdvertisement = await FoodAdvertisement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!deletedAdvertisement) {
      return res.status(404).json({
        success: false,
        message: 'Food advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food advertisement deactivated successfully',
      data: deletedAdvertisement
    });
  } catch (error) {
    console.error('Error deactivating food advertisement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate food advertisement',
      error: error.message
    });
  }
};

// Add rating to food advertisement
exports.addRating = async (req, res) => {
  try {
    const { userEmail, rating } = req.body;

    const advertisement = await FoodAdvertisement.findByIdAndUpdate(
      req.params.id,
      { $push: { ratings: { userEmail, rating } } },
      { new: true }
    );

    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: 'Food advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rating added successfully',
      data: advertisement
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add rating',
      error: error.message
    });
  }
};

// Add feedback to food advertisement
exports.addFeedback = async (req, res) => {
  try {
    const { userEmail, comment } = req.body;

    const advertisement = await FoodAdvertisement.findByIdAndUpdate(
      req.params.id,
      { $push: { feedback: { userEmail, comment } } },
      { new: true }
    );

    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: 'Food advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: advertisement
    });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add feedback',
      error: error.message
    });
  }
};