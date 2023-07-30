const express = require("express");
const path = require("path");
const OTPController = require("../controllers/OTPController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "otp.html"));
});
router.post("/", OTPController);

module.exports = router;
