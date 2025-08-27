// controllers/step-2.js
const step2Service = require("../services/service-step-2");

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

const initFormData = async (req, res) => {
  try {
    const result = await step2Service.initFormData(req.body, req.file);
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

module.exports = { getFormData, initFormData, saveFormData };
