const SaveList = require("../models/saveList");

// Controller to add a new item to saveItems
const addItemToSaveList = async (req, res) => {
  try {
    const { email, itemId, category, itemName, url } = req.body;

    // Find the document by email
    let userSaveList = await SaveList.findOne({ email });

    if (!userSaveList) {
      // If the user doesn't exist, create a new document
      userSaveList = new SaveList({
        email,
        saveItems: [{ itemId, category, itemName, url }],
      });
    } else {
      // Push the new item to saveItems array
      userSaveList.saveItems.push({ itemId, category, itemName, url });
    }

    // Save the updated document
    await userSaveList.save();

    res.status(200).json({ message: "Item added successfully", data: userSaveList });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
};

// Fetch save list items for a specific user
const getSaveListByEmail = async (req, res) => {
    const { userEmail } = req.params;
  
    try {
      // Find the save list for the provided email
      const saveList = await SaveList.findOne({ email: userEmail });
  
      if (!saveList) {
        return res.status(404).json({ message: "No save list found for this user." });
      }
  
      res.status(200).json(saveList.saveItems);
    } catch (error) {
      console.error("Error fetching save list:", error);
      res.status(500).json({ message: "Error fetching save list.", error });
    }
  };
  

module.exports = {
  addItemToSaveList,
  getSaveListByEmail,
};
