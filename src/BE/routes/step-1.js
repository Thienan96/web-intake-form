const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../util/index");
const step1Controller = require("../controllers/step-1.controller");

router.get("/step-1/:formId/:stepId", step1Controller.getFormData);
router.get(
  "v2/step-1/:formId/:stepId",
  asyncHandler(step1Controller.getFormDataV2)
);
router.post("/init-step-1", step1Controller.initFormData);
router.post("/step-1/:formId/:stepId", step1Controller.saveFormData);

module.exports = router;
