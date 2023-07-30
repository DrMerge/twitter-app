const express = require("express");
const botDataController = require("../controllers/botDataController");
const router = express.Router();

router.post("/", botDataController);

module.exports = router;
