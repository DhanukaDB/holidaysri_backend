// controllers/friendController.js
const Friend = require('../models/friends');

// Add friend to a user's friends array
const addFriend = async (req, res) => {
    const { email, friendEmail } = req.body;

    try {
        // Find the user by email
        const user = await Friend.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the friend is already in the array
        if (user.friends.includes(friendEmail)) {
            return res.status(400).json({ message: 'Friend already added' });
        }

        // Add the new friend's email to the friends array
        user.friends.push(friendEmail);
        await user.save();

        res.status(200).json({ message: 'Friend added successfully', user });
    } catch (error) {
        console.error("Error adding friend:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// Check if a friend exists in the friends array
const checkFriend = async (req, res) => {
    const { email, friendEmail } = req.body;

    try {
        const user = await Friend.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFriend = user.friends.includes(friendEmail);

        if (isFriend) {
            return res.status(200).json({ message: 'Friend exists in the list', isFriend: true });
        } else {
            return res.status(200).json({ message: 'Friend not found in the list', isFriend: false });
        }
    } catch (error) {
        console.error("Error checking friend:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch all friends of a user
const getAllFriends = async (req, res) => {
    const { email } = req.query;  // Get the email from query parameters

    try {
        // Find the user by email
        const user = await Friend.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the list of friends
        const friends = user.friends;

        // Return the array of friends directly
        res.status(200).json(friends);
    } catch (error) {
        console.error("Error fetching friends:", error.message);  // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { addFriend, checkFriend, getAllFriends };

