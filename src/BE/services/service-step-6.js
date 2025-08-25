const Step6 = require("../models/Step6");

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

  return { path: `/step-thankyou/${formId}` };
};

module.exports = { saveFormData };
