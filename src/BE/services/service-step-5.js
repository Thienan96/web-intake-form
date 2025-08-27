const Step5 = require("../models/Step5");

const getFormData = async (formId, stepId) => {
  const stepData = await Step5.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const initFormData = async (formData) => {
  const newStep5 = await Step5.create({ ...formData });
  return { path: `/step-6/${newStep5.formId}/${newStep5.stepId}` };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step5.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-6/${formId}/${stepId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
