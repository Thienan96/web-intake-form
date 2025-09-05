const express = require("express");
const router = express.Router();
const step3Controller = require("../controllers/step-3");

router.get("/step-3/:formId/:stepId", step3Controller.getFormData);
router.post("/step-3/:formId/:stepId", step3Controller.saveFormData);

module.exports = router;
