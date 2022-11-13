const express = require("express");
const { getStatistics } = require("../../controllers/statistics");

const router = express.Router();

router.route("/:accountId").post(getStatistics);

module.exports = router;
