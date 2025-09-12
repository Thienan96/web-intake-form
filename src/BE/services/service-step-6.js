const Step5 = require("../models/Step5");
const Step6 = require("../models/Step6");

const getFormData = async (formId, stepId) => {
  const stepData = await Step6.findOne({ formId, stepId });
  const prevStep5 = await Step5.findOne({ formId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData, prevStepId: prevStep5.stepId };
};

const saveFormData = async (formId, stepId, formData, file) => {
  let signature_url = {};
  if (file) {
    signature_url = {
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
    };
  }

  await Step6.findOneAndUpdate(
    { formId, stepId },
    { ...formData, signature_url, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/thank-you/${formId}` };
};

module.exports = { getFormData, saveFormData };
