const express = require("express");
const {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomes");

const router = express.Router();

router.route("/:accountId").get(getIncomes).post(createIncome);

router.route("/:accountId/:expanseId").patch(updateIncome).delete(deleteIncome);

module.exports = router;
