const Step6 = require("../models/Step6");

const getFormData = async (formId, stepId) => {
  const stepData = await Step6.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const initFormData = async (formData, file) => {
  const newStep6 = await Step6.create({ ...formData });
  if (file) {
    newStep6.signature_url = {
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
    };
    await newStep6.save();
  }
  return { path: `/step-thankyou/${newStep6.formId}` };
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

  return { path: `/step-thankyou/${formId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
