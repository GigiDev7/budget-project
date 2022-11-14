const express = require("express");
const {
  getAllAccounts,
  getSingleAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountSum,
} = require("../controllers/account");

const router = express.Router();

router.route("/").get(getAllAccounts).post(createAccount);

router
  .route("/:accountId")
  .get(getSingleAccount)
  .delete(deleteAccount)
  .patch(updateAccount);

router.route("/:accountId/sum").get(getAccountSum);

module.exports = router;
