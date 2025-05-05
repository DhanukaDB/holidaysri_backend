const mongoose = require('mongoose');

const LiveRideSchema = new mongoose.Schema({
    // Advertisement Info
    adsTimeFrame: {
        type: String,
        enum: ['Daily', 'Monthly'],
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    boostPoints: {
        type: Number,
        default: 0
    },
    Currency: {
        type: String,
        default: "HSC"
    },
    Title: {
        type: String,
        default: "Live Ride Advertisement"
    },

    // Vehicle Info
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleBrand: {
        type: String,
        required: true
    },
    vehicleOwnerName: {
        type: String,
        required: true
    },
    vehicleCategory: {
        type: String,
        enum: ["Bus", "Car", "Van", "Bike", "ThreeWheel", "Truck", "Other"],
        required: true
    },
    images: [{
        type: String,
        required: true
    }],

    // Ride Info
    route: {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    maxPassengerCount: {
        type: Number,
        required: true
    },
    availablePassengerCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Ongoing", "Upcoming", "Starting Soon", "Over Soon"],
        required: true
    },
    rideDate: {
        type: String,
        required: true
    },
    rideTime: {
        type: String,
        required: true
    },
    timeFormat: {
        type: String,
        enum: ["AM", "PM"],
        required: true
    },
    apxTime: {
        hours: {
            type: Number,
            required: true
        },
        minutes: {
            type: Number,
            required: true
        }
    },

    // Pricing Options
    pricings: [{
        reason: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],

    // Location
    location: {
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    },

    // Contact Info
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        facebook: {
            type: String
        },
        whatsapp: {
            type: String
        }
    },
    liveLocationURL: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },

    // Agent Info
    openForAgent: {
        type: Boolean,
        default: false
    },
    discountRate: {
        type: Number
    },
    earnRate: {
        type: Number
    },
    promocodeUsed: {
        type: String
    },

    // User Info
    userEmail: {
        type: String,
        required: true
    },

    // Ratings & Feedback
    ratings: {
        driver: [{
            userEmail: {
                type: String,
            },
            rating: {
                type: Number, 
                min: 1,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        vehicle: [{
            userEmail: {
                type: String,
            },
            rating: {
                type: Number, 
                min: 1,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        overallExperience: [{
            userEmail: {
                type: String,
            },
            rating: {
                type: Number, 
                min: 1,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    feedback: [{
        userEmail: {
            type: String,
        },
        category: {
            type: String,
            enum: ['Driver', 'Vehicle', 'OverallExperience', 'General'],
            default: 'General'
        },
        comment: {
            type: String, 
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('LiveRide', LiveRideSchema);