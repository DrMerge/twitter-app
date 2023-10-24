const express = require("express");
const path = require("path");
const retryController = require("../controllers/retryOTPController.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
});

module.exports = router;
