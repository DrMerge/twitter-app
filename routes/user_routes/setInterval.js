const express = require("express");
const setIntervalController = require("../../controllers/setIntervalController");
const router = express.Router();

router.get("/", setIntervalController.handleSendPage);
router.post("/", setIntervalController.handleInterval);

module.exports = router;