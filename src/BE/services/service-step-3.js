const Step3 = require("../models/Step3");

const getFormData = async (formId, stepId) => {
  const stepData = await Step3.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const initFormData = async (formData) => {
  const newStep3 = await Step3.create({ ...formData });
  return { path: `/step-4/${newStep3.formId}/${newStep3.stepId}` };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step3.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-4/${formId}/${stepId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
