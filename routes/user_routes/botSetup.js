const express = require("express");
const botSetupController = require("../../controllers/botSetupController");
const router = express.Router();

router.get("/", botSetupController.handleSendPage);
router.post("/", botSetupController.handleSetup);

module.exports = router;
