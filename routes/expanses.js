const express = require("express");
const {
  getExpanses,
  createExpanse,
  updateExpanse,
  deleteExpanse,
} = require("../controllers/expanses");

const router = express.Router();

router.route("/:accountId").get(getExpanses).post(createExpanse);

router
  .route("/:accountId/:expanseId")
  .patch(updateExpanse)
  .delete(deleteExpanse);

module.exports = router;
