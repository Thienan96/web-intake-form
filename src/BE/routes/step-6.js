const express = require("express");
const router = express.Router();
const step6Controller = require("../controllers/step-6");
const upload = require("../middleware/upload");

router.get("/step-6/:formId/:stepId", step6Controller.getFormData);
router.post(
  "/init-step-6",
  upload.single("file"),
  step6Controller.initFormData
);
router.post(
  "/step-6/:formId/:stepId",
  upload.single("file"),
  step6Controller.saveFormData
);

module.exports = router;
