const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();

const userRouter = require("./routes/User-routes");
const productItemRouter = require("./routes/productItemRoute");

const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/productItem" ,productItemRouter);

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

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