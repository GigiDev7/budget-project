const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:categoryId").patch(updateCategory).delete(deleteCategory);

module.exports = router;
