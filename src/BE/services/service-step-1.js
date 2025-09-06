const Step1 = require("../models/Step1");
const Step2 = require("../models/Step2");
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
  await Step1.create({ ...formData, formId: newForm.formId });
  const newStep2 = await Step2.create({ formId: newForm.formId });
  return { path: `/step-2/${newForm.formId}/${newStep2.stepId}` };
};

const saveFormData = async (formId, stepId, formData) => {
  await Step1.findOneAndUpdate(
    { formId, stepId },
    { ...formData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep2 = await Step2.create({ formId });
  return { path: `/step-2/${formId}/${newStep2.stepId}` };
};

module.exports = { getFormData, initFormData, saveFormData };
