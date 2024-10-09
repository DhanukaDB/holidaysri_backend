const Hotel = require("../models/Hotel");
const Backup = require("../models/Backup");
const nodemailer = require('nodemailer');

// add new hotel for system
exports.addNewHotel = async (req, res) => {
  const {
    hotelName,category,email,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl,fullboardPrice,halfboardPrice,liquor,smoke,roomType,roomCapacity,parking,internet,bbqFacilities,chef,activities,cctv,promoCode
  } = req.body;

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  Hotel.findOne({ hotelName: hotelName })
    .then((savedHotel) => {
      const newHotel = new Hotel({
        hotelName,category,email,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl,fullboardPrice,halfboardPrice,liquor,smoke,roomType,roomCapacity,parking,internet,bbqFacilities,chef,activities,cctv,expirationDate,promoCode
      });

      newHotel.save().then(() => {
        res.json("New Hotel Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding hotel", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding hotel", message: err.message });
    });
};

// delete existing one
exports.deleteHotel = async (req, res) => {
  let hotelId = req.params.id;

  try {
    const hotelToDelete = await Hotel.findById(hotelId);

    if (!hotelToDelete) {
      return res.status(404).json({ status: "Hotel not found" });
    }

    const Data = [
      `hotelName: ${hotelToDelete.hotelName}`,
      `category: ${hotelToDelete.category}`,
      `email: ${hotelToDelete.email}`,
      `location: ${hotelToDelete.location}`,
      `description: ${hotelToDelete.description}`,
      `price: ${hotelToDelete.price}`,
      `images: ${Array.isArray(hotelToDelete.images) ? hotelToDelete.images.join(', ') : hotelToDelete.images}`,
      `googleMap: ${hotelToDelete.googleMap}`,
      `whatsappNumber: ${hotelToDelete.whatsappNumber}`,
      `fb: ${hotelToDelete.fb}`,
      `contactNumber: ${hotelToDelete.contactNumber}`,
      `webUrl: ${hotelToDelete.webUrl}`,
      `fullboardPrice:${hotelToDelete.fullboardPrice}`,
      `halfboardPrice:${hotelToDelete.halfboardPrice}`,
      `liquor:${hotelToDelete.liquor}`,
      `smoke:${hotelToDelete.smoke}`,
      `roomType:${hotelToDelete.roomType}`,
      `roomCapacity:${hotelToDelete.roomCapacity}`,
      `parking:${hotelToDelete.parking}`,
      `internet:${hotelToDelete.internet}`,
      `bbqFacilities:${hotelToDelete.bbqFacilities}`,
      `chef:${hotelToDelete.chef}`,
      `activities:${hotelToDelete.activities}`,
      `cctv:${hotelToDelete.cctv}`
 

    ];

    const deletedHotel = new Backup({
      Data,
      originalModel: "Hotel"
    });

    await deletedHotel.save();
    await Hotel.findByIdAndDelete(hotelId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};


// update 
exports.updateHotel = async (req, res) => {
  let hotelId = req.params.id;
  const {
    hotelName,category,email,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl,fullboardPrice,halfboardPrice,liquor,smoke,roomType,roomCapacity,parking,internet,bbqFacilities,chef,activities,cctv
 

  } = req.body;
  const updateHotel = {
    hotelName,category,email,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl,fullboardPrice,halfboardPrice,liquor,smoke,roomType,roomCapacity,parking,internet,bbqFacilities,chef,activities,cctv
 

  };

  Hotel.findByIdAndUpdate(hotelId, updateHotel)
    .then(() => {
      res.status(200).send({ status: "Hotel details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// view 
exports.viewHotels = async (req, res) => {
  Hotel.find().then((hotels) => {
    res.json(hotels);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching hotels", message: err.message });
  });
};

// view one
exports.viewOneHotel = async (req, res) => {
  let hotelId = req.params.id;

  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel) {
        return res.status(404).send({ status: "Hotel not found" });
      }
      res.status(200).send({ status: "Hotel fetched", hotel });
    }).catch((err) => {
      res.status(500).send({ status: "Error with get", error: err.message });
    });
};

// view hotels by location
exports.viewHotelByLocation = async (req, res) => {
  let location = req.params.location;

  Hotel.find({ location: location }).then((hotels) => {
    if (!hotels || hotels.length === 0) {
      return res.status(404).send({ status: "Hotels not found for the given location" });
    }
    res.status(200).send({ status: "Hotels fetched", hotels });
  }).catch((err) => {
    res.status(500).send({ status: "Error with get", error: err.message });
  });
};


// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS // Your email password or app password
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: to, // recipient address
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response); // Success logging
  } catch (error) {
    console.error("Error sending email: ", error); // Error logging
    throw error; // Throw the error to handle it in the calling function
  }
};

// New Controller: Update Hotel expiration date by id
// This function allows updating the expiration date of an existing advertisement  by id
exports.updateHotelAddExpiration = async (req, res) => {
  try {
    const { _id, newExpirationDate, userEmail } = req.body;

    // Find the promo code by the user's email
    const hotelObj = await Hotel.findOne({ _id });

    if (!hotelObj) {
      return res.status(404).json({ error: 'hotel Add not found for this id' });
    }

    // Update the expiration date with the new provided date (1 year from now)
    hotelObj.expirationDate = new Date(newExpirationDate);

     // Save the updated hotel object
    await hotelObj.save();

    // Send email notification to the user
    const emailSubject = 'Hotel Add Expiration Date Updated';
    const emailText = `Dear user,\n\nThe expiration date for your hotel add has been updated to ${newExpirationDate}.\n\nThank you!`;

    await sendEmail(userEmail, emailSubject, emailText); // Send email

    res.status(200).json({ message: 'Hotel expiration date updated successfully and email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
