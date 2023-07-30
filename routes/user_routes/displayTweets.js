const express = require("express");
const handleDisplayTweet = require("../../controllers/displayTweetsController");

const path = require("path");

const router = express.Router();

router.get("/", handleDisplayTweet);

module.exports = router;
