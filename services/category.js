const Category = require("../models/categorySchema");

const findAllCategories = (userId) => {
  const categories = Category.find({ userId });
  return categories;
};

module.exports = {
  findAllCategories,
};
