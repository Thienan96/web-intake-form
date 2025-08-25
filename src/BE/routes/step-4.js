const express = require("express");
const router = express.Router();
const step4Service = require("../services/service-step-4");

router.get("/step-4/:formId/:stepId", async (req, res) => {
  try {
    const result = await step4Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post("/step-4/:formId/:stepId", async (req, res) => {
  try {
    const result = await step4Service.saveFormData(
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
