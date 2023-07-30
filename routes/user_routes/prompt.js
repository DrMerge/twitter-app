const express = require("express");
const promptController = require("../../controllers/promptController");
const router = express.Router();

router.get("/", promptController.receivePrompt);
router.post("/", promptController.handlePrompt);

module.exports = router;
