const Step1 = require("../models/Step1");
const Form = require("../models/Form");

const getFormData = async (formId, stepId) => {
  const stepData = await Step1.findOne({ formId, stepId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData };
};

const initFormData = async (formData) => {
  const newForm = await Form.create({});
  const newStep1 = await Step1.create({ ...formData, formId: newForm.formId });
  return { path: `/step-2/${newForm.formId}/${newStep1.stepId}` };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step1.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  return { path: `/step-2/${formId}/${stepId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
