const Step2 = require("../models/Step2");

const getFormData = async (formId, stepId) => {
  const stepData = await Step2.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const saveFormData = async (formId, stepId, formData, file) => {
  if (file && formData.preferred_format === "digital") {
    formData.summary_of_assesment_document_url = {
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
    };
  }

  await Step2.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-3/${formId}/${stepId}` };
};

module.exports = { getFormData, saveFormData };
