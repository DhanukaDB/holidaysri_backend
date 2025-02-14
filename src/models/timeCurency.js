const mongoose = require("mongoose");

const timeCurencySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email validation
  },
  timeCurencys: {
    hours: {
      type: Number,
      required: true,
      min: [0, "hours cannot be negative"], // Ensures hours are non-negative
      default: 0, // Default value if not provided
    },
    minutes: {
      type: Number,
      required: true,
      min: [0, "minutes cannot be negative"], // Ensures minutes are non-negative
      default: 0, // Default value if not provided
    },
  },
});

// Pre-save middleware to handle minutes > 59
timeCurencySchema.pre("save", function (next) {
  const time = this.timeCurencys;

  if (time.minutes >= 60) {
    time.hours += Math.floor(time.minutes / 60); // Add the number of full hours from minutes
    time.minutes = time.minutes % 60; // Set minutes to the remainder
  }

  next(); // Proceed with saving the document
});

const timeCurency = mongoose.model("timeCurency", timeCurencySchema);

module.exports = timeCurency;
