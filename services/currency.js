const Currency = require("../models/currencySchema");

const findAllCurrencies = async () => {
  const currencies = await Currency.find();
  return currencies;
};

const findByCountry = async (countryName) => {
  const currency = await Currency.findOne({ countryName });
  return currency;
};

module.exports = {
  findAllCurrencies,
  findByCountry,
};
