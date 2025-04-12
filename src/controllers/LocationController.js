const Location = require("../models/Location");
const Backup = require("../models/Backup");

// Add new Location for system
exports.addNewLocation = async (req, res) => {
  const { locationName, district, province, distanceFromColombo, images, details, backgroundImage, climate, map, locationType } = req.body;

  Location.findOne({ locationName: locationName })
    .then((savedLocation) => {
      if (savedLocation) {
        return res.status(422).json({ error: "Location Name already exists" });
      }

      const newLocation = new Location({
        locationName,
        district,
        province,
        distanceFromColombo,
        images,
        details,
        backgroundImage,
        climate,  // Adding climate here
        map, // Adding map here
        locationType 
      });

      newLocation.save().then(() => {
        res.json("New Location Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding location", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding location", message: err.message });
    });
};

// Delete existing one
exports.deleteLocation = async (req, res) => {
  let locationId = req.params.id;

  try {
    const locationToDelete = await Location.findById(locationId);

    if (!locationToDelete) {
      return res.status(404).json({ status: "Location not found" });
    }

    const Data = [
      `locationName: ${locationToDelete.locationName}`,
      `district: ${locationToDelete.district}`,
      `province: ${locationToDelete.province}`,
      `distanceFromColombo: ${locationToDelete.distanceFromColombo}`,
      `images: ${Array.isArray(locationToDelete.images) ? locationToDelete.images.join(', ') : locationToDelete.images}`,
      `details: ${locationToDelete.details}`,
      `backgroundImage: ${locationToDelete.backgroundImage}`,
      `climate: ${locationToDelete.climate}`,  // Saving climate
      `map: ${locationToDelete.map}`           // Saving map
      `locationType: ${locationToDelete.locationType}`  
    ];

    const deletedLocation = new Backup({
      Data,
      originalModel: "Location"
    });

    await deletedLocation.save();
    await Location.findByIdAndDelete(locationId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update Location
exports.updateLocation = async (req, res) => {
  let locationId = req.params.id;
  const { locationName, district, province, distanceFromColombo, images, details, backgroundImage, climate, map, locationType } = req.body;
  const updateLocation = {
    locationName,
    district,
    province,
    distanceFromColombo,
    images,
    details,
    backgroundImage,
    climate,  // Updating climate here
    map,        // Updating map here
    locationType
  };

  Location.findByIdAndUpdate(locationId, updateLocation)
    .then(() => {
      res.status(200).send({ status: "Location details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// View all locations
exports.viewLocations = async (req, res) => {
  Location.find().then((locations) => {
    res.json(locations);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching locations", message: err.message });
  });
};

// View one location
exports.viewOneLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const foundLocation = await Location.findById(locationId);
    if (!foundLocation) {
      return res.status(404).json({ status: "Location not found" });
    }
    res.status(200).json({ status: "Location fetched", location: foundLocation });
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ status: "Error with get", error: error.message });
  }
};

// Add feedback to a location
exports.addFeedback = async (req, res) => {
  const locationId = req.params.id;
  const { userEmail, comment } = req.body;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ status: "Location not found" });
    }

    // Push the new feedback to the feedback array
    location.feedback.push({ userEmail, comment });

    // Save the updated location
    await location.save();

    res.status(200).json({ status: "Feedback added successfully", feedback: { userEmail, comment } });
  } catch (error) {
    res.status(500).json({ status: "Error with adding feedback", error: error.message });
  }
};

// Get all feedback for a location
exports.viewFeedback = async (req, res) => {
  const locationId = req.params.id;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ status: "Location not found" });
    }

    // Return the feedback array
    res.status(200).json({ status: "Feedback fetched successfully", feedback: location.feedback });
  } catch (error) {
    res.status(500).json({ status: "Error with fetching feedback", error: error.message });
  }
};

// Add rating to a location
exports.addRating = async (req, res) => {
  const locationId = req.params.id;
  const { userEmail, rating } = req.body;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ status: "Location not found" });
    }

    // Push the new rating to the feedback array
    location.ratings.push({ userEmail, rating });

    // Save the updated location
    await location.save();

    res.status(200).json({ status: "Feedback added successfully", ratings: { userEmail, rating } });
  } catch (error) {
    res.status(500).json({ status: "Error with adding feedback", error: error.message });
  }
};

// Get all ratings for a location
exports.viewRating = async (req, res) => {
  const locationId = req.params.id;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ status: "Location not found" });
    }

    // Return the rating array
    res.status(200).json({ status: "Feedback fetched successfully", ratings: location.ratings });
  } catch (error) {
    res.status(500).json({ status: "Error with fetching feedback", error: error.message });
  }
};

// location find by name

exports.getLocationIdByName = async (req, res) => {
    try {
        const { locationName } = req.query; // Assuming locationName is passed as a query parameter

        if (!locationName) {
            return res.status(400).json({ message: 'Location name is required' });
        }

        const location = await Location.findOne({ locationName }, '_id');

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ locationId: location._id });
    } catch (error) {
        console.error('Error fetching location ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};