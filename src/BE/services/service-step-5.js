const Step5 = require("../models/Step5");
const Step6 = require("../models/Step6");

const getFormData = async (formId, stepId) => {
  const stepData = await Step5.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { stepData };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step5.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep6 = await Step6.create({ formId });
  return { path: `/step-6/${formId}/${newStep6.stepId}` };
};

module.exports = { getFormData, saveFormData };
