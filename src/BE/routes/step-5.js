const express = require("express");
const router = express.Router();
const step5Controller = require("../controllers/step-5");

router.get("/step-5/:formId/:stepId", step5Controller.getFormData);
router.post("/init-step-5", step5Controller.initFormData);
router.post("/step-5/:formId/:stepId", step5Controller.saveFormData);

module.exports = router;
