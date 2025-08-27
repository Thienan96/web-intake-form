const Step4 = require("../models/Step4");

const getFormData = async (formId, stepId) => {
  const stepData = await Step4.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const initFormData = async (formData) => {
  const newStep4 = await Step4.create({ ...formData });
  return { path: `/step-5/${newStep4.formId}/${newStep4.stepId}` };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step4.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-5/${formId}/${stepId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
