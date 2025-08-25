const Step5 = require("../models/Step5");

const saveFormData = async (formId, stepId, formData) => {
  await Step5.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-6/${formId}/${stepId}` };
};

module.exports = { saveFormData };
