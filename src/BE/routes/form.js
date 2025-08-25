const express = require("express");
const router = express.Router();
const formService = require("../services/service-form");

router.get("/form/:formId", async (req, res) => {
  try {
    const result = await formService.getAllFormData(req.params.formId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
