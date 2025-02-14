const Favorite = require('../models/favorites');

// Add item to a user's favorites array
const addFavorite = async (req, res) => {
    const { email, item } = req.body;

    try {
        // Find the user by email
        const user = await Favorite.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the item is already in the favorites array
        if (user.favorites.includes(item)) {
            return res.status(400).json({ message: 'Item already in favorites' });
        }

        // Add the new item to the favorites array
        user.favorites.push(item);
        await user.save();

        res.status(200).json({ message: 'Item added to favorites', user });
    } catch (error) {
        console.error("Error adding favorite:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// Check if an item exists in the favorites array
const checkFavorite = async (req, res) => {
    const { email, item } = req.body;

    try {
        const user = await Favorite.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFavorite = user.favorites.includes(item);

        if (isFavorite) {
            return res.status(200).json({ message: 'Item exists in favorites', isFavorite: true });
        } else {
            return res.status(200).json({ message: 'Item not found in favorites', isFavorite: false });
        }
    } catch (error) {
        console.error("Error checking favorite:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch all favorites of a user
const getFavorites = async (req, res) => {
    const { email } = req.query;  // Get the email from query parameters

    try {
        // Find the user by email
        const user = await Favorite.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the list of favorites
        const favorites = user.favorites;

        // Return the array of favorites directly
        res.status(200).json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { addFavorite, checkFavorite, getFavorites };

