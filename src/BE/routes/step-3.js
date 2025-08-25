const express = require("express");
const router = express.Router();
const step3Service = require("../services/service-step-3");

router.get("/step-3/:formId/:stepId", async (req, res) => {
  try {
    const result = await step3Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post("/step-3/:formId/:stepId", async (req, res) => {
  try {
    const result = await step3Service.saveFormData(
      req.params.formId,
      req.params.stepId,
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
