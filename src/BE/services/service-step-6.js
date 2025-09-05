const Step6 = require("../models/Step6");

const getFormData = async (formId, stepId) => {
  const stepData = await Step6.findOne({ formId, stepId });
  if (!stepData) {
    await Step6.create({ formId });
  }
  return { formData: stepData };
};

const saveFormData = async (formId, stepId, formData, file) => {
  if (file) {
    formData.signature_url = {
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
    };
  }

  await Step6.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/thank-you/${formId}` };
};

module.exports = { getFormData, saveFormData };
