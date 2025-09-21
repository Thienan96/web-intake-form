const Step1 = require("../models/Step1");

const getFormData = async (formId) => {
  const step1Data = await Step1.findOne({ formId });
  if (!step1Data) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: step1Data };
};

module.exports = { getFormData };
