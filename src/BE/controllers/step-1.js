const step1Service = require("../services/service-step-1");

const getFormData = async (req, res) => {
  try {
    const result = await step1Service.getFormData(
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
    const result = await step1Service.initFormData(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const saveFormData = async (req, res) => {
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
};

module.exports = { getFormData, initFormData, saveFormData };
