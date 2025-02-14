const AllFavorite = require("../models/AllFavorite");

// Controller to add a new favorite
const addFavorite = async (req, res) => {
  try {
    const { email, category, item } = req.body;

    // Find the document by email
    let userFavorites = await AllFavorite.findOne({ email });

    if (!userFavorites) {
      // If the user doesn't exist, create a new document
      userFavorites = new AllFavorite({
        email,
        allFavorites: [{ category, items: [{ item }] }],
      });
    } else {
      // Check if the category exists
      const categoryIndex = userFavorites.allFavorites.findIndex(fav => fav.category === category);

      if (categoryIndex >= 0) {
        // If category exists, push new item to items array
        userFavorites.allFavorites[categoryIndex].items.push({ item });
      } else {
        // If category doesn't exist, push a new category with the item
        userFavorites.allFavorites.push({ category, items: [{ item }] });
      }
    }

    // Save the updated document
    await userFavorites.save();

    res.status(200).json({ message: "Favorite added successfully", data: userFavorites });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

// Fetch all favorite items for a specific user
const getFavoritesByEmail = async (req, res) => {
    const { userEmail } = req.params;
  
    try {
      // Find the favorites list for the provided email
      const allFavorites = await AllFavorite.findOne({ email: userEmail });
  
      if (!allFavorites) {
        return res.status(404).json({ message: "No favorites found for this user." });
      }
  
      // Flatten the items from all categories for easier checking
      const flattenedFavorites = allFavorites.allFavorites.flatMap((category) =>
        category.items.map((item) => ({
          item: item.item,
          category: category.category,
        }))
      );
  
      res.status(200).json(flattenedFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Error fetching favorites.", error });
    }
  };

module.exports = {
  addFavorite,
  getFavoritesByEmail,
};
