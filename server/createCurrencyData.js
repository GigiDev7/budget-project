require("dotenv").config();
require("./connectDB");
const countryData = require("./countryData.json");
const codeData = require("./countryCodeData.json");
const symbolsData = require("./symbolsData");
const Currency = require("./models/currencySchema");

let data = [];

for (const key in countryData) {
  const countryName = countryData[key];
  const currencyCode = codeData[key];
  data.push({ countryName, currencyCode });
}

for (let item of symbolsData) {
  const country = data.find((el) => el.currencyCode === item.abbreviation);
  if (country) country.symbol = item.symbol;
}

(async () => {
  await Currency.create(data);
})();
