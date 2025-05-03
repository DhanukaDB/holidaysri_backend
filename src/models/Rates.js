const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({

    rateID: {
        type: String,
    },
    discounthotelPercentage: {
        type: Number,
    },
    discountpackagePercentage: {
        type: Number,
    },
    discountProductsPercentage: {
        type: Number,
    },
    discountvehiclePercentage: {
        type: Number,
    },
    discountagentPercentage: {
        type: Number,
    },
    discountguidePercentage: {
        type: Number,
    },
    discountPromoCodeLocalPercentage: {
        type: Number,
    },
    discountPromoCodeForeignPercentage: {
        type: Number,
    },
    discountLiveRidePercentage: {
        type: Number,
    },
    discountEventPercentage: {
        type: Number,
    },
    discountLocalPartnerPercentage: {
        type: Number,
    },
    discountForeignPartnerPercentage: {
        type: Number,
    },
    discountDailyPercentage: {
        type: Number,
    },
    discountMonthlyPercentage: {
        type: Number,
    },
    hotelAdvertiseRate: {
        type: Number,
    },
    hotelAdvertismentEarnRateNew: {
        type: Number,
    },
    hotelRoomAditionalRoomRate: {
        type: Number,
    },
    packageAdvertiseRate: {
        type: Number,
    },
    productsAdvertiseRate: {
        type: Number,
    },
    vehicleAdvertiseRate: {
        type: Number,
    },
    agentAdvertiseRate: {
        type: Number,
    },
    guideAdvertiseRate: {
        type: Number,
    },
    promoCodeLocalRate: {
        type: Number,
    },
    promoCodeForeignRate: {
        type: Number,
    },
    liveRideMonthlyRate: {
        type: Number,
    },
    liveRideDailyRate: {
        type: Number,
    },
    eventRate: {
        type: Number,
    },
    earningRate: {
        type: Number,
    },
    partnerLocalRate: {
        type: Number,
    },
    partnerForeignRate: {
        type: Number,
    },
    dailyFoodRate: {
        type: Number,
    },
    monthlyFoodRate: {
        type: Number,
    },
    dailyEarnRate: {
        type: Number,
    },
    monthlyEarnRate: {
        type: Number,
    },
    packageDeductRate: {
        type: Number,
    },
    packageEarnRate: {
        type: Number,
    },
    partnerLocalEarnRate: {
        type: Number,
    },
    partnerForeignEarnRate: {
        type: Number,
    },
    promoCodeLocalEarnRate: {
        type: Number,
    },
    promoCodeForeignEarnRate: {
        type: Number,
    },
    //new
    diamondPromocodeRate: {
        type: Number,
    },
    diamondPromocodeRateForeign: {
        type: Number,
    },
    goldPromocodeRate: {
        type: Number,
    },
    goldPromocodeRateForeign: {
        type: Number,
    },
    silverPromocodeRate: {
        type: Number,
    },
    silverPromocodeRateForeign: {
        type: Number,
    },
    allPromocodeDiscountRate: {
        type: Number,
    },
    diamondPromocodeEarnRate: {
        type: Number,
    },
    goldPromocodeEarnRate: {
        type: Number,
    },
    silverPromocodeEarnRate: {
        type: Number,
    },
    freePromocodeEarnRate: {
        type: Number,
    },
    specialPromocodeEarnRate: {
        type: Number,
    },
    specialPromocodeDiscountRate: {
        type: Number,
    },
    HSCRate: {
        type: Number,
    },
    HSCRateForeign: {
        type: Number,
    },
    HSDRate: {
        type: Number,
    },
    HSGRate: {
        type: Number,
    },
    exchangeateUSD: {
        type: Number,
    },
    allPromocodeDiscountRateDaily: {
        type: Number,
    },
    diamondPromocodeEarnRateAdsMonthly: {
        type: Number,
    },
    goldPromocodeEarnRateAdsMonthly: {
        type: Number,
    },
    silverPromocodeEarnRateAdsMonthly: {
        type: Number,
    },
    freePromocodeEarnRateAdsMonthly: {
        type: Number,
    },
    specialPromocodeEarnRateAdsMonthly: {
        type: Number,
    },
    diamondPromocodeEarnRateAdsDaily: {
        type: Number,
    },
    goldPromocodeEarnRateAdsDaily: {
        type: Number,
    },
    silverPromocodeEarnRateAdsDaily: {
        type: Number,
    },
    freePromocodeEarnRateRateAdsDaily: {
        type: Number,
    },
    specialPromocodeEarnRateAdsDaily: {
        type: Number,
    },


   
}, { timestamps: true }); // Adding { timestamps: true } here

const Rate = mongoose.model("Rates", rateSchema);
module.exports = Rate;

