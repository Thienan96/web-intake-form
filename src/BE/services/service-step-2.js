const Step1 = require("../models/Step1");
const Step2 = require("../models/Step2");
const Step3 = require("../models/Step3");

const getFormData = async (formId, stepId) => {
  const stepData = await Step2.findOne({ formId, stepId });
  const prevStep1 = await Step1.findOne({ formId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }
  return { formData: stepData, prevStepId: prevStep1.stepId };
};

const saveFormData = async (formId, stepId, formData, file) => {
  let summary_of_assesment_document_url = {};
  if (file && formData.preferred_format === "digital") {
    summary_of_assesment_document_url = {
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
    };
  }

  await Step2.findOneAndUpdate(
    { formId, stepId },
    {
      ...formData,
      veteran: {
        is_vet: formData.veteran_is_vet,
        is_active: formData.active_is_vet,
      },
      rcmp: {
        is_vet: formData.veteran_is_rcmp,
        is_active: formData.active_is_rcmp,
      },
      summary_of_assesment_document_url,
      formId,
      stepId,
    },
    { upsert: true, new: true }
  );

  const newStep3 = await Step3.findOneAndUpdate(
    { formId },
    { $setOnInsert: { formId } },
    { upsert: true, new: true }
  );
  return { path: `/step-3/${formId}/${newStep3.stepId}` };
};

module.exports = { getFormData, saveFormData };
