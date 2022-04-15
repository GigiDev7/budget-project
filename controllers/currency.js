const { findAllCurrencies, findByCountry } = require("../services/currency");

exports.getCurrency = async (req, res) => {
  try {
    const { countryName } = req.query;
    if (countryName) {
      const currency = await findByCountry(countryName);
      return res.status(200).json(currency);
    }
    const currencies = await findAllCurrencies();
    return res.status(200).json(currencies);
  } catch (err) {
    res.status(400).json(err);
  }
};
