const express = require("express");
const router = express.Router();
const step5Service = require("../services/service-step-5");

router.get("/step-5/:formId/:stepId", async (req, res) => {
  try {
    const result = await step5Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post("/step-5/:formId/:stepId", async (req, res) => {
  try {
    const result = await step5Service.saveFormData(
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
