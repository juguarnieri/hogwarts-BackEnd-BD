const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController.js");

// Defina as rotas para os wizards
router.get("/", wizardController.getAllWizards);
router.get("/:id", wizardController.getWizard);
router.post("/", wizardController.createWizard);
router.put("/:id", wizardController.updateWizard);
router.delete("/:id", wizardController.deleteWizard);

module.exports = router;