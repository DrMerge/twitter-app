const express = require("express");
const path = require("path");
const refreshController = require("../controllers/refreshController");
const router = express.Router();

router.get("/", refreshController);

module.exports = router;
