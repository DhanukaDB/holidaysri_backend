const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Main Hotel Schema
const hotelSchema = new Schema(
  {
    hotelName: { type: String, required: true },
    userEmail: { type: String, required: true },
    category: { 
      type: String,
      required: true 
    },
    description: { type: String, required: true },
    climate: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      mapUrl: { type: String, required: true },
    },
    contactInfo: {
      email: { type: String, required: true },
      contactNumber: { type: String, required: true },
      whatsappNumber: { type: String },
      facebookUrl: { type: String },
      websiteUrl: { type: String },
    },
    rooms: [{
      roomName: { 
        type: String 
      },
      type: { 
        type: String,  
        required: true 
      },
      capacity: { type: Number, required: true },
      beds: { type: Number, required: true },
      roomDescription: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
      pricePerFullDay: { type: Number, required: true },
      pricing: {
        fullboardPrice: { type: Number },
        fullboardinclude: {  
          type: [String], 
          default: [] 
        },
        halfboardPrice: { type: Number },
        halfboardinclude: {  
          type: [String], 
          default: [] 
        },
      },
      isAvailable: { type: Boolean, default: true },
      amenities: { 
        type: [String], 
        default: [] 
      },
      images: { 
        type: [String],
        validate: {
          validator: (v) => v.length <= 10, 
          message: 'A room can have a maximum of 10 images.'
        }
      },
      bookedDates: {
        type: [
          {
            checkingdate: {
              type: Date
            },
            checkOutdate: {
              type: Date
            },
            RoomUnit: {
              type: String,
              default: ''
            },
            Guests: {
              type: String,
              default: ''
            },
            note: {
              type: String,
              default: ''
            },
            BookingId: {
              type: String,
              default: ''
            }
          }
        ],
        default: [],
        validate: {
          validator: (bookings) => 
            bookings.every(booking => !isNaN(new Date(booking.date).getTime())),
          message: 'Invalid date format in bookedDates array.'
        }
      },
      noOfRooms: { 
        type: Number,  
        required: true 
      },
      canPayAdvance: { type: Boolean },
      advancePercentage: { 
        type: Number 
      },
      roomOpenForAgents: { type: Boolean },
      discountForPromo : { type: Number },
      EarnRateForPromo : { type: Number },
    }],
    displayPriceMain: { type: Number, required: true },
    facilities: {
      internet: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      bbqFacilities: { type: Boolean, default: false },
      chef: { type: Boolean, default: false },
      cctv: { type: Boolean, default: false },
      swimmingPool: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      spa: { type: Boolean, default: false },
      kidsPlayArea: { type: Boolean, default: false },
      roomService: { type: Boolean, default: false },
      restaurant: { type: Boolean, default: false },
      laundryService: { type: Boolean, default: false },
      airportShuttle: { type: Boolean, default: false },
      petFriendly: { type: Boolean, default: false },
      smokingArea: { type: Boolean, default: false },
      garden: { type: Boolean, default: false },
      library: { type: Boolean, default: false },
      gameRoom: { type: Boolean, default: false },
      conferenceRoom: { type: Boolean, default: false },
      banquetHall: { type: Boolean, default: false },
      yogaDeck: { type: Boolean, default: false },
      privateBeach: { type: Boolean, default: false },
      sauna: { type: Boolean, default: false },
      bar: { type: Boolean, default: false },
      wheelchairAccess: { type: Boolean, default: false },
      electricVehicleCharging: { type: Boolean, default: false },
      firepit: { type: Boolean, default: false },
      hikingTrails: { type: Boolean, default: false },
      bikeRental: { type: Boolean, default: false },          // For guests who want to explore the area on bicycles
      rooftopTerrace: { type: Boolean, default: false },      // A scenic outdoor space for relaxation or events
      wineCellar: { type: Boolean, default: false },          // For wine enthusiasts or private tastings
      movieTheater: { type: Boolean, default: false },        // An in-house theater for entertainment
      coworkingSpace: { type: Boolean, default: false },      // For remote workers or business travelers
      picnicArea: { type: Boolean, default: false },          // Outdoor space for picnics and gatherings
      fishingPond: { type: Boolean, default: false },         // For recreational fishing
      tennisCourt: { type: Boolean, default: false },         // For sports enthusiasts
      golfCourse: { type: Boolean, default: false },          // For guests interested in golfing
      skiStorage: { type: Boolean, default: false },          // For winter sports enthusiasts
      babysittingService: { type: Boolean, default: false },  // For families traveling with young children
      meditationRoom: { type: Boolean, default: false },      // A quiet space for mindfulness and relaxation
      rooftopPool: { type: Boolean, default: false },         // A pool with a view, often on the rooftop
      artGallery: { type: Boolean, default: false },          // For cultural or artistic experiences
      farmToTableDining: { type: Boolean, default: false },   // Featuring locally sourced meals
      outdoorJacuzzi: { type: Boolean, default: false },      // A hot tub for relaxation outdoors
      birdWatchingArea: { type: Boolean, default: false },    // For nature enthusiasts
      EVChargingStation: { type: Boolean, default: false },   // For electric vehicle owners (alternative to electricVehicleCharging)
      rooftopBar: { type: Boolean, default: false },          // A bar with a view, often on the rooftop
      karaokeRoom: { type: Boolean, default: false },         // For entertainment and group activities
    },
    
    diningOptions: {
      breakfastIncluded: { type: Boolean, default: false },
      breakfastInfo: { type: String },
      breakfastCharge : { type: Number },
      restaurantOnSite: { type: Boolean, default: false },
      restaurantInfo: { type: String },
    },
    policies: {
      allowsLiquor: { type: Boolean, default: false },
      allowsSmoking: { type: Boolean, default: false },
      cancellationPolicy: { 
        type: String, 
        default: "Free cancellation within 24 hours of booking. Charges may apply beyond this period." 
      },
      checkInTime: { type: String, default: "2:00 PM" },
      checkOutTime: { type: String, default: "12:00 PM" },
      pets: { type: Boolean, default: false },
      petPolicyDetails: { type: String },
      parties: { type: Boolean, default: false },
      partyPolicyDetails: { type: String },
      childPolicy: { 
        type: String, 
        default: "Children of all ages are welcome. Additional charges may apply for extra bedding." 
      },
      ageRestriction: { 
        type: Boolean, 
        default: false 
      },
      minimumCheckInAge: { 
        type: Number, 
        default: 18 
      },
      damageDeposit: { 
        type: Boolean, 
        default: false 
      },
      damageDepositAmount: { 
        type: Number, 
        default: 0 
      },
      refundPolicy: { 
        type: String, 
        default: "Refunds are processed within 7 business days of cancellation." 
      },
      noShowPolicy: { 
        type: String, 
        default: "No-shows are charged 100% of the booking amount." 
      },
      lateCheckOutPolicy: { 
        type: String, 
        default: "Late check-out is subject to availability and may incur additional charges." 
      },
      earlyCheckInPolicy: { 
        type: String, 
        default: "Early check-in is subject to availability and may incur additional charges." 
      },
      quietHours: { 
        type: String, 
        default: "" 
      },
      additionalCharges: { 
        type: String, 
        default: "Additional charges may apply for extra guests, special requests, or facilities usage." 
      },
      taxAndCharges: { type: Boolean, default: false },
      taxAndChargesAmount: { 
        type: Number, 
        default: 0 
      },
      acceptedpaymentmethods: {
        type: [String],
        default: [],
      },
    },
        
    activities: {
      onsiteActivities: { 
        type: [String], 
        default: [] 
      },
      nearbyAttractions: {  // this for nearby Locations
        type: [String], 
        default: [] 
      },
      nearbyActivities: {  // this for nearby Attractions and Activities
        type: [String], 
        default: [] 
      },
    },
    promoCode: { type: String },
    expirationDate: {
      type: Date,
      default: () => {
          let date = new Date();
          date.setFullYear(date.getFullYear() + 1);
          return date;
      }
    },
    isActive: { type: Boolean, default: true },
    isOpenForAgents: { type: Boolean, default: false },
    images: { 
      type: [String], 
      validate: {
        validator: (v) => v.length <= 20, 
        message: 'A hotel can have a maximum of 20 images.'
      }
    },
    ratings: [{
      userEmail: {
          type: String,
      },
      rating: {
          type: Number, 
          min: 1,
          max: 5,
      }
    }],
    feedback: [{
      userEmail: {
          type: String,
      },
      forWhat: {
        type: String, 
    },
      comment: {
          type: String, 
      }
    }],
    otherInfo: {
      type: [String],
      default: [],
    },
    isHaveStars: { type: Boolean, default: false },
    howManyStars: { type: Number},
    isVerified: { type: Boolean, default: false },
    isHaveCertificate: { type: Boolean, default: false },
    isHaveLicense: { type: Boolean, default: false },
    acceptTeams: { type: Boolean, default: false },
    boostPoints: {
      type: Number,
      default: 0
  },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;