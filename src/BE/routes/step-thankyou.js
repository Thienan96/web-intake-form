const express = require("express");
const router = express.Router();
const thankyouService = require("../services/service-thankyou");

router.get("/step-thankyou/:formId", async (req, res) => {
  try {
    const result = await thankyouService.getFormData(req.params.formId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
