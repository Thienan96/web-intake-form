const express = require("express");
const router = express.Router();
const step1Controller = require("../controllers/step-1");

router.get("/step-1/:formId/:stepId", step1Controller.getFormData);
router.post("/init-step-1", step1Controller.initFormData);
router.post("/step-1/:formId/:stepId", step1Controller.saveFormData);

module.exports = router;
