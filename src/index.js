const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();

// const userRouter = require("./routes/User-routes");


// Import backup functionality
const { performBackup } = require('./backup.js');
// Import deleting expired records
const { deleteOldRecords } = require('./expiration.js');
// Import deleting expired live ride records
const { deleteExpiredRecords } = require('./realtimeExpire.js');

const app = express();

// Enable CORS requests from origin
app.use(cors({
  origin: "http://localhost:5173"
}));


app.use(express.json());

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/guide', require('./routes/guideRoutes'));
app.use('/api/partner', require('./routes/partnerRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));
//app.use('/api/vehicle', require('./routes/vehicleRouter'));

//product router
const productRouter = require("./routes/productRoutes.js");
app.use("/product", productRouter);

//event router
const eventRouter = require("./routes/eventRoutes.js");
app.use("/event", eventRouter);

//location router
const locationRouter = require("./routes/locationRoutes.js");
app.use("/location", locationRouter);

//vehicle router
const vehicleRouter = require("./routes/vehicleRouter.js");
app.use("/vehicle", vehicleRouter);

//promo code router
const promoCodeRouter = require("./routes/promoCodeRouter.js");
app.use("/promo", promoCodeRouter);

//Package  router
const packageRouter = require("./routes/packageRoutes.js");
app.use("/package", packageRouter);

//Local Package  router
const localPackageRouter = require("./routes/localPackageRoutes.js");
app.use("/localPackage", localPackageRouter);

//Hotel router
const hotelRouter = require("./routes/hotelRoutes.js");
app.use("/hotel", hotelRouter);

//Rates Router
const rateRouter = require("./routes/rateRoutes.js");
app.use("/rate", rateRouter);

//RealTime Router
const realTimeRouter = require("./routes/realTimeRoutes.js");
app.use("/realTime", realTimeRouter);

//Booking Router
const bookingRouter = require("./routes/bookingRoutes.js");
app.use("/booking", bookingRouter);

//Collection Router
const collectionRouter = require('./routes/collectionRoutes.js');
app.use('/collection', collectionRouter);

//Payment Request Router
const PaymentRouter = require('./routes/PaymentRoutes.js');
app.use('/paymentrequest', PaymentRouter);

const initialize = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT_URL);
      console.log("Mongodb connection success!");
    } catch (e) {
      console.log(e);
    }
  };

  const startServer = async () => {
    await initialize();
    app.listen(process.env.PORT || 8000);
    console.log('Server started');

    // Optionally, run the backup immediately on server start
    performBackup();

    // Ensure the deletion script is also started
    deleteOldRecords();

    // Ensure the live ride deletion script is also started
    deleteExpiredRecords();
  };
  
  startServer();