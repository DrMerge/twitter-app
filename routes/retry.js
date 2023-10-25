const express = require("express");
const path = require("path");
const retryController = require("../controllers/retryOTPController.js");
const router = express.Router();

router.get("/", retryController);

module.exports = router;
