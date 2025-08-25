const express = require("express");
const router = express.Router();
const step1Service = require("../services/service-step-1");

router.get("/step-1/:formId/:stepId", async (req, res) => {
  try {
    const result = await step1Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post("/step-1/:formId/:stepId", async (req, res) => {
  try {
    const result = await step1Service.saveFormData(
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
