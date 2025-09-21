const { SUCCESS } = require("../core/success.response");
const getFormDataV2 = async (req, res) => {
  new SUCCESS({
    message: "Get form successfully",
    metadata: await step1Service.getFormData2(
      req.params.formId,
      req.params.stepId
    ),
  }).send(res);
};
const step1Service = require("../services/step-1.service");

const getFormData = async (req, res) => {
  try {
    const result = await step1Service.getFormData(
      req.params.formId,
      req.params.stepId
    );
    res.json(result.formData);
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

module.exports = { getFormData, initFormData, saveFormData, getFormDataV2 };
