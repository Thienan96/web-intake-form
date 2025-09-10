const step6Service = require("../services/service-step-6");

const getFormData = async (req, res) => {
  try {
    const result = await step6Service.getFormData(
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
};

module.exports = { getFormData, saveFormData };
