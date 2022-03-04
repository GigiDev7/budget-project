const getCategories = (req, res) => {
  res.status(200).send("categories");
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
