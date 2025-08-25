const Step4 = require("../models/Step4");

const saveFormData = async (formId, stepId, formData) => {
  await Step4.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-5/${formId}/${stepId}` };
};

module.exports = { saveFormData };
