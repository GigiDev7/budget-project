const express = require("express");
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

const router = express.Router();

router.route("/:accountId").get(getTransactions).post(createTransaction);
router
  .route("/transaction/:transactionId")
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
