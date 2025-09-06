const Step4 = require("../models/Step4");
const Step5 = require("../models/Step5");

const getFormData = async (formId, stepId) => {
  const stepData = await Step4.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { stepData };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step4.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep5 = await Step5.create({ formId });
  return { path: `/step-5/${formId}/${newStep5.stepId}` };
};

module.exports = { getFormData, saveFormData };
