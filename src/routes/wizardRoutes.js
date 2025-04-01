const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController.js");

router.get("/", wizardController.getAllWizards);
router.get("/:id", wizardController.getWizard);
router.post("/", wizardController.createWizard);

module.exports = router;
