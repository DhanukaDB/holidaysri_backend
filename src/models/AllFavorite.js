const mongoose = require("mongoose");

const allFavoriteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  allFavorites: [
    {
      category: {
        type: String,
      },
      items: [
        {
          item: {
            type: String,
          },
        },
      ],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("AllFavorite", allFavoriteSchema);
