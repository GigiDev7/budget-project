const Currency = require("../models/currencySchema");

const findAllCurrencies = async () => {
  let currencies = await Currency.find();
  currencies = currencies.filter((el) => el._doc.hasOwnProperty("symbol"));
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
