const express = require("express");
const userHome = require("../../controllers/userHome");

const path = require("path");

const router = express.Router();

router.get("/", userHome);

module.exports = router;
