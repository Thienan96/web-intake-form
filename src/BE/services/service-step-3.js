const Step3 = require("../models/Step3");

const saveFormData = async (formId, stepId, formData) => {
  await Step3.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-4/${formId}/${stepId}` };
};

module.exports = { saveFormData };
