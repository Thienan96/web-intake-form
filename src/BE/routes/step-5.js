const express = require("express");
const router = express.Router();
const step5Controller = require("../controllers/step-5.controller");

router.get("/step-5/:formId/:stepId", step5Controller.getFormData);
router.post("/step-5/:formId/:stepId", step5Controller.saveFormData);

module.exports = router;
