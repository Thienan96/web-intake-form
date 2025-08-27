const express = require("express");
const router = express.Router();
const step2Controller = require("../controllers/step-2");
const upload = require("../middleware/upload");

router.get("/step-2/:formId/:stepId", step2Controller.getFormData);
router.post(
  "/init-step-2",
  upload.single("file"),
  step2Controller.initFormData
);
router.post(
  "/step-2/:formId/:stepId",
  upload.single("file"),
  step2Controller.saveFormData
);

module.exports = router;
