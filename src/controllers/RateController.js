const rateDetails = require("../models/Rates.js");

//add rates for system
exports.addRate= async (req, res) => {
 
    //constant variables for the attributes
    const {
      rateID,
    discounthotelPercentage,
    discountpackagePercentage,
    discountProductsPercentage,
    discountvehiclePercentage,
    discountagentPercentage,
    discountguidePercentage,
    discountPromoCodeLocalPercentage,
    discountPromoCodeForeignPercentage,
    discountLiveRidePercentage,
    discountEventPercentage,
    discountLocalPartnerPercentage,
    discountForeignPartnerPercentage,
    discountDailyPercentage,
    discountMonthlyPercentage,
    hotelAdvertiseRate,
    packageAdvertiseRate,
    productsAdvertiseRate,
    vehicleAdvertiseRate,
    agentAdvertiseRate,
    guideAdvertiseRate,
    promoCodeLocalRate,
    promoCodeForeignRate,
    liveRideMonthlyRate,
    liveRideDailyRate,
    eventRate,
    earningRate,
    partnerLocalRate,
    partnerForeignRate,
    dailyFoodRate,
    monthlyFoodRate,
    dailyEarnRate,
    monthlyEarnRate,
    packageDeductRate,
    packageEarnRate,
    partnerLocalEarnRate,
    partnerForeignEarnRate,
    promoCodeLocalEarnRate,
    promoCodeForeignEarnRate,
    diamondPromocodeRate,
    diamondPromocodeRateForeign,
    goldPromocodeRate,
    goldPromocodeRateForeign,
    silverPromocodeRate,
    silverPromocodeRateForeign,
    allPromocodeDiscountRate,
    HSCRate,
    HSCRateForeign,
    HSDRate,
    HSGRate,
    diamondPromocodeEarnRate,
    goldPromocodeEarnRate,
    silverPromocodeEarnRate,
    freePromocodeEarnRate,
    specialPromocodeEarnRate,
    specialPromocodeDiscountRate,
    exchangeateUSD,
    hotelRoomAditionalRoomRate,
    allPromocodeDiscountRateDaily,
diamondPromocodeEarnRateAdsMonthly,
goldPromocodeEarnRateAdsMonthly,
silverPromocodeEarnRateAdsMonthly,
freePromocodeEarnRateAdsMonthly,
specialPromocodeEarnRateAdsMonthly,
diamondPromocodeEarnRateAdsDaily,
goldPromocodeEarnRateAdsDaily,
silverPromocodeEarnRateAdsDaily,
freePromocodeEarnRateRateAdsDaily,
specialPromocodeEarnRateAdsDaily,
dailyRestaurantRate,
monthlyRestaurantRate,
    
     } = req.body;
  
  
    rateDetails.findOne({rateID: rateID})
      .then((savedRate) => {
          if(savedRate) {
              return res.status(422).json({error:"Vehicle already exists with that no"})
          }
  
          const newRate = new rateDetails({
            rateID,
    discounthotelPercentage,
    discountpackagePercentage,
    discountProductsPercentage,
    discountvehiclePercentage,
    discountagentPercentage,
    discountguidePercentage,
    discountPromoCodeLocalPercentage,
    discountPromoCodeForeignPercentage,
    discountLiveRidePercentage,
    discountEventPercentage,
    discountLocalPartnerPercentage,
    discountForeignPartnerPercentage,
    discountDailyPercentage,
    discountMonthlyPercentage,
    hotelAdvertiseRate,
    packageAdvertiseRate,
    productsAdvertiseRate,
    vehicleAdvertiseRate,
    agentAdvertiseRate,
    guideAdvertiseRate,
    promoCodeLocalRate,
    promoCodeForeignRate,
    liveRideMonthlyRate,
    liveRideDailyRate,
    eventRate,
    earningRate,
    partnerLocalRate,
    partnerForeignRate,
    dailyFoodRate,
    monthlyFoodRate,
    dailyEarnRate,
    monthlyEarnRate,
    packageDeductRate,
    packageEarnRate,
    partnerLocalEarnRate,
    partnerForeignEarnRate,
    promoCodeLocalEarnRate,
    promoCodeForeignEarnRate,
    diamondPromocodeRate,
    diamondPromocodeRateForeign,
    goldPromocodeRate,
    goldPromocodeRateForeign,
    silverPromocodeRate,
    silverPromocodeRateForeign,
    allPromocodeDiscountRate,
    HSCRate,
    HSCRateForeign,
    HSDRate,
    HSGRate,
    diamondPromocodeEarnRate,
    goldPromocodeEarnRate,
    silverPromocodeEarnRate,
    freePromocodeEarnRate,
    specialPromocodeEarnRate,
    specialPromocodeDiscountRate,
    exchangeateUSD,
    hotelRoomAditionalRoomRate,
    allPromocodeDiscountRateDaily,
diamondPromocodeEarnRateAdsMonthly,
goldPromocodeEarnRateAdsMonthly,
silverPromocodeEarnRateAdsMonthly,
freePromocodeEarnRateAdsMonthly,
specialPromocodeEarnRateAdsMonthly,
diamondPromocodeEarnRateAdsDaily,
goldPromocodeEarnRateAdsDaily,
silverPromocodeEarnRateAdsDaily,
freePromocodeEarnRateRateAdsDaily,
specialPromocodeEarnRateAdsDaily,
dailyRestaurantRate,
monthlyRestaurantRate,

        })
    
        newRate.save().then(() => {
             res.json("Rates Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteRate = async (req, res) => {
    let rateID = req.params.id;
   
    await rateDetails.findByIdAndDelete(rateID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateRate= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {rateID,
      discounthotelPercentage,
      discountpackagePercentage,
      discountProductsPercentage,
      discountvehiclePercentage,
      discountagentPercentage,
      discountguidePercentage,
      discountPromoCodeLocalPercentage,
    discountPromoCodeForeignPercentage,
      discountLiveRidePercentage,
      discountEventPercentage,
      discountLocalPartnerPercentage,
    discountForeignPartnerPercentage,
      discountDailyPercentage,
    discountMonthlyPercentage,
      hotelAdvertiseRate,
      packageAdvertiseRate,
      productsAdvertiseRate,
      vehicleAdvertiseRate,
      agentAdvertiseRate,
      guideAdvertiseRate,
      promoCodeLocalRate,
      promoCodeForeignRate,
      liveRideMonthlyRate,
    liveRideDailyRate,
      eventRate,
      earningRate,
      partnerLocalRate,
    partnerForeignRate,
      dailyFoodRate,
    monthlyFoodRate,
    dailyEarnRate,
    monthlyEarnRate,
    packageDeductRate,
    packageEarnRate,
    partnerLocalEarnRate,
    partnerForeignEarnRate,
    promoCodeLocalEarnRate,
    promoCodeForeignEarnRate,
    diamondPromocodeRate,
    diamondPromocodeRateForeign,
    goldPromocodeRate,
    goldPromocodeRateForeign,
    silverPromocodeRate,
    silverPromocodeRateForeign,
    allPromocodeDiscountRate,
    HSCRate,
    HSCRateForeign,
    HSDRate,
    HSGRate,
    diamondPromocodeEarnRate,
    goldPromocodeEarnRate,
    silverPromocodeEarnRate,
    freePromocodeEarnRate,
    specialPromocodeEarnRate,
    specialPromocodeDiscountRate,
    exchangeateUSD,
    hotelRoomAditionalRoomRate,
    allPromocodeDiscountRateDaily,
diamondPromocodeEarnRateAdsMonthly,
goldPromocodeEarnRateAdsMonthly,
silverPromocodeEarnRateAdsMonthly,
freePromocodeEarnRateAdsMonthly,
specialPromocodeEarnRateAdsMonthly,
diamondPromocodeEarnRateAdsDaily,
goldPromocodeEarnRateAdsDaily,
silverPromocodeEarnRateAdsDaily,
freePromocodeEarnRateRateAdsDaily,
specialPromocodeEarnRateAdsDaily,
dailyRestaurantRate,
monthlyRestaurantRate,

           } = req.body;
  
    const updateRate = {
      rateID,
      discounthotelPercentage,
      discountpackagePercentage,
      discountProductsPercentage,
      discountvehiclePercentage,
      discountagentPercentage,
      discountguidePercentage,
      discountPromoCodeLocalPercentage,
    discountPromoCodeForeignPercentage,
      discountLiveRidePercentage,
      discountEventPercentage,
      discountLocalPartnerPercentage,
    discountForeignPartnerPercentage,
      discountDailyPercentage,
    discountMonthlyPercentage,
      hotelAdvertiseRate,
      packageAdvertiseRate,
      productsAdvertiseRate,
      vehicleAdvertiseRate,
      agentAdvertiseRate,
      guideAdvertiseRate,
      promoCodeLocalRate,
      promoCodeForeignRate,
      liveRideMonthlyRate,
    liveRideDailyRate,
      eventRate,
      earningRate,
      partnerLocalRate,
    partnerForeignRate,
      dailyFoodRate,
    monthlyFoodRate,
    dailyEarnRate,
    monthlyEarnRate,
    packageDeductRate,
    packageEarnRate,
    partnerLocalEarnRate,
    partnerForeignEarnRate,
    promoCodeLocalEarnRate,
    promoCodeForeignEarnRate,
    diamondPromocodeRate,
    diamondPromocodeRateForeign,
    goldPromocodeRate,
    goldPromocodeRateForeign,
    silverPromocodeRate,
    silverPromocodeRateForeign,
    allPromocodeDiscountRate,
    HSCRate,
    HSCRateForeign,
    HSDRate,
    HSGRate,
    diamondPromocodeEarnRate,
    goldPromocodeEarnRate,
    silverPromocodeEarnRate,
    freePromocodeEarnRate,
    specialPromocodeEarnRate,
    specialPromocodeDiscountRate,
    exchangeateUSD,
    hotelRoomAditionalRoomRate,
    allPromocodeDiscountRateDaily,
diamondPromocodeEarnRateAdsMonthly,
goldPromocodeEarnRateAdsMonthly,
silverPromocodeEarnRateAdsMonthly,
freePromocodeEarnRateAdsMonthly,
specialPromocodeEarnRateAdsMonthly,
diamondPromocodeEarnRateAdsDaily,
goldPromocodeEarnRateAdsDaily,
silverPromocodeEarnRateAdsDaily,
freePromocodeEarnRateRateAdsDaily,
specialPromocodeEarnRateAdsDaily,
dailyRestaurantRate,
monthlyRestaurantRate,

    }
  
  
    const update = await rateDetails.findByIdAndUpdate(id, updateRate).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewRates= async (req, res) => { 
 
    //calling  model
    rateDetails.find().then((rates) => {
      res.json(rates)
  
  }).catch((err) => {
     
  })
  
  }

  //view one
exports.viewOneRate = async (req, res) => {
    let rateID = req.params.id;
    const rate = await rateDetails.findById(rateID).then((rate) => {
        res.status(200).send({ status: "fetched", rate });
    }).catch((err) => {
        res.status(500).send({ status: "Error with get", error: err.message });
    });
}
