const Step4 = require("../models/Step4");

const getFormData = async (formId, stepId) => {
  const stepData = await Step4.findOne({ formId, stepId });
  if (!stepData) {
    await Step4.create({ formId });
  }
  return { formData: stepData };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step4.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-5/${formId}/${stepId}` };
};

module.exports = { getFormData, saveFormData };
