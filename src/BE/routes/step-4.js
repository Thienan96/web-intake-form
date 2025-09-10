const express = require("express");
const router = express.Router();
const step4Controller = require("../controllers/step-4");

router.get("/step-4/:formId/:stepId", step4Controller.getFormData);
router.post("/step-4/:formId/:stepId", step4Controller.saveFormData);

module.exports = router;
