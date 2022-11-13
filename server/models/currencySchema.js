const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  countryName: String,
  currencyCode: String,
  symbol: String,
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
