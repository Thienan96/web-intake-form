const express = require("express");
const router = express.Router();
const step6Service = require("../services/service-step-6");
const upload = require("../middleware/upload");

router.post(
  "/step-6/:formId/:stepId",
  upload.single("file"),
  async (req, res) => {
    try {
      const result = await step6Service.saveFormData(
        req.params.formId,
        req.params.stepId,
        req.body,
        req.file
      );
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
);

module.exports = router;
