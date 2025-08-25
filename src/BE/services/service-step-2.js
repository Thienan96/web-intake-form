const Step2 = require("../models/Step2");

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

module.exports = { saveFormData };
