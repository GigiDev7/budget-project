const { findAllCategories } = require("../services/category");

const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories(req.userId);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCategory = (req, res) => {
  res.status(201).send("create category");
};

const updateCategory = (req, res) => {
  const { categoryId } = req.params;
  res.status(200).send("update category");
};

const deleteCategory = (req, res) => {
  const { categoryId } = req.params;
  res.status(200).send("delete category");
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
