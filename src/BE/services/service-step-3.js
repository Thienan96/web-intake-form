const Step2 = require("../models/Step2");
const Step3 = require("../models/Step3");
const Step4 = require("../models/Step4");

const getFormData = async (formId, stepId) => {
  const stepData = await Step3.findOne({ formId, stepId });
  const prevStep2 = await Step2.findOne({ formId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData, prevStepId: prevStep2.stepId };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step3.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep4 = await Step4.findOneAndUpdate(
    { formId },
    { $setOnInsert: { formId } },
    { upsert: true, new: true }
  );
  return { path: `/step-4/${formId}/${newStep4.stepId}` };
};

module.exports = { getFormData, saveFormData };
