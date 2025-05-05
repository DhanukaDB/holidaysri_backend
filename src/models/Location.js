const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName: {
        type: String,
    },
    district: {
        type: String,
    },
    province: {
        type: String,
    },
    distanceFromColombo: {
        type: String,
    },
    climate: {
        type: String,
    },
    map: {
        type: String,
    },
    locationType: {
        type: String,
    },
    images: {
        type: [String], // Array of strings to store image URLs
        validate: {
            validator: function (v) {
                return v.length <= 6; // Validate that the array length is at most 6
            },
            message: props => `${props.value} exceeds the limit of 6 images per location!`
        }
    },
    details: {
        type: String,
    },
    backgroundImage: {
        type: String,
    },
    ratings: [{
        userEmail: {
            type: String,
        },
        rating: {
            type: Number, 
            min: 1, // Rating should be between 1 and 5
            max: 5,
        }
    }],
    feedback: [{
        userEmail: {
            type: String,
        },
        comment: {
            type: String, 
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
