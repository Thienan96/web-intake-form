const Step1 = require("../models/Step1");
const Form = require("../models/Form");

const getFormData = async (formId, stepId) => {
  const stepData = await Step1.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const saveFormData = async (formId, stepId, formData) => {
  await Form.findOneAndUpdate({ formId }, { formId }, { upsert: true });

  await Step1.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-2/${formId}/${stepId}` };
};

module.exports = { getFormData, saveFormData };
