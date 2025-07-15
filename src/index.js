const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();

// const userRouter = require("./routes/User-routes");

const app = express();

// Enable CORS requests from origin
app.use(cors({
  origin: ["http://localhost:5173", "https://holidaysri.com", "https://holidaysri-new-frontend.vercel.app"]
}));

app.options('*', cors()); // This will enable preflight requests for all routes


app.use(express.json());

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/guide', require('./routes/guideRoutes'));
// app.use('/api/partner', require('./routes/partnerRoutes'));
// app.use('/api/agent', require('./routes/agentRoutes'));
// app.use('/api/seller', require('./routes/sellerRoutes'));
//app.use('/api/vehicle', require('./routes/vehicleRouter'));

//location router
const locationRouter = require("./routes/locationRoutes.js");
app.use("/location", locationRouter);

//Hotel router
const hotelRouter = require("./routes/hotelRoutes.js");
app.use("/hotel", hotelRouter);

// new

//Coins router
const CoinsRouter = require("./routes/coinRoutes.js");
app.use("/coin", CoinsRouter);

//Diamonds router
const DiamondsRouter = require("./routes/diamondRoutes");
app.use("/diamond", DiamondsRouter);

//Diamonds router
const GemsRouter = require("./routes/gemRoutes.js");
app.use("/gem", GemsRouter);

//Tokens router
const TokensRouter = require("./routes/tokenRoutes.js");
app.use("/token", TokensRouter);

//Vouchers router
const VouchersRouter = require("./routes/voucherRoutes.js");
app.use("/voucher", VouchersRouter);

//RewardPoints router
const RewardPointsRouter = require("./routes/rewrdPointRoutes.js");
app.use("/reward", RewardPointsRouter);

//TimeCurrency router
const TimeCurrencyRouter = require("./routes/timeCurrencyRoutes.js");
app.use("/TimeCurrency", TimeCurrencyRouter);

//Gifts router
const GiftsRouter = require("./routes/giftRoutes.js");
app.use("/gift", GiftsRouter);

//Rates Router
const rateRouter = require("./routes/rateRoutes.js");
app.use("/rate", rateRouter);

//new promocodes Router
const promocodeRouter = require("./routes/newPromocodeRoutes.js");
app.use("/newPromocodes", promocodeRouter);

// Friends Router
const friendsRouter = require("./routes/friendsRoutes.js");
app.use("/friends", friendsRouter);

// Favorites Router
const favoritesRouter = require("./routes/favoritesRoutes");
app.use("/favorites", favoritesRouter);

// Earnings Router
const earnsRouter = require("./routes/earningsRoutes.js");
app.use("/earnings", earnsRouter);

// Payment Activity Router
const paymentActivityRouter = require("./routes/paymentActivityRoutes");
app.use("/paymentAct", paymentActivityRouter);

// All Favorite Router
const allFavoriteRouter = require("./routes/allFavoriteRoutes");
app.use("/allfavorite", allFavoriteRouter);

// save List Router
const saveListrRouter = require("./routes/saveListRoutes");
app.use("/saveList", saveListrRouter);


const newFoodsRouter = require("./routes/newFoodsRoutes.js");
app.use("/foodsNew", newFoodsRouter);


const newResturentRouter = require("./routes/newResturentRoutes.js");
app.use("/resturentsNew", newResturentRouter);

const newLiveRideRouter = require("./routes/newLiveRideRoutes.js");
app.use("/lverideNew", newLiveRideRouter);

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

  };
  
  startServer();