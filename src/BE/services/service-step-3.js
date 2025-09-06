const Step3 = require("../models/Step3");
const Step4 = require("../models/Step4");

const getFormData = async (formId, stepId) => {
  const stepData = await Step3.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { stepData };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step3.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep4 = await Step4.create({ formId });
  return { path: `/step-4/${formId}/${newStep4.stepId}` };
};

module.exports = { getFormData, saveFormData };
