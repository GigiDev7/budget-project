const Category = require("../models/categorySchema");

const findAllCategories = (userId) => {
  const categories = Category.find({ userId });
  return categories;
};

const addCategory = async (userId, data) => {
  const categoryData = { ...data, userId };
  const category = await Category.create(categoryData);
  return category;
};

const findCategoryAndUpdate = async (categoryId, data) => {
  const category = await Category.findByIdAndUpdate(categoryId, data, {
    new: true,
  });
  return category;
};

const findCategoryAndDelete = async (categoryId) => {
  await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  findAllCategories,
  addCategory,
  findCategoryAndUpdate,
  findCategoryAndDelete,
};
