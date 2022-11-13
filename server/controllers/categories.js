const {
  findAllCategories,
  addCategory,
  findCategoryAndUpdate,
  findCategoryAndDelete,
} = require("../services/category");

const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories(req.userId);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await addCategory(req.userId, req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await findCategoryAndUpdate(categoryId, req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await findCategoryAndDelete(categoryId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
