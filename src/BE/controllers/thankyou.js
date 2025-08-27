const thankyouService = require("../services/service-thankyou");

const getFormData = async (req, res) => {
  try {
    const result = await thankyouService.getFormData(req.params.formId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { getFormData };
