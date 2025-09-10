const step3Service = require("../services/service-step-3");

const getFormData = async (req, res) => {
  try {
    const result = await step3Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const saveFormData = async (req, res) => {
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
};

module.exports = { getFormData, saveFormData };
