const Restaurant = require('../models/ResturantNew');

// Create new restaurant advertisement
exports.createRestaurant = async (req, res) => {
  try {
    const formData = req.body;
    
    // Calculate expiration date based on adsTimeFrame
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    
    if (formData.adsTimeFrame === "Monthly") {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    } else {
      expirationDate.setDate(expirationDate.getDate() + 1);
    }

    // Prepare restaurant data for database
    const restaurantData = {
      ...formData,
      location: {
        city: formData.city,
        province: formData.province
      },
      operatingHours: {
        openTime: formData.openTime,
        closeTime: formData.closeTime
      },
      agentOptions: {
        isAgentOption: formData.isAgentOption,
        discountRate: formData.discountRate,
        earnRate: formData.earnRate
      },
      expirationDate,
      isActive: true,
      isVerified: false,
      boostPoints: 0,
      ratings: [],
      feedback: [],
      promocodeUsed: formData.promocode,
    };

    // Create new restaurant
    const newRestaurant = await Restaurant.create(restaurantData);

    res.status(201).json({
      success: true,
      message: 'Restaurant advertisement created successfully',
      data: newRestaurant
    });

  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create restaurant advertisement',
      error: error.message
    });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
      error: error.message
    });
  }
};

// Get single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }
    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurant',
      error: error.message
    });
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedRestaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      data: updatedRestaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update restaurant',
      error: error.message
    });
  }
};

// Delete restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete restaurant',
      error: error.message
    });
  }
};