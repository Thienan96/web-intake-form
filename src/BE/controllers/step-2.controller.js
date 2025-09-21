const step2Service = require("../services/step-2.service");

const getFormData = async (req, res) => {
  try {
    const result = await step2Service.getFormData(
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
    const result = await step2Service.saveFormData(
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
