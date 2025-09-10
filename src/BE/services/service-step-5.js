const Step4 = require("../models/Step4");
const Step5 = require("../models/Step5");
const Step6 = require("../models/Step6");

const transformFormData = (flatData) => {
  const nestedData = {
    physical_health_services: {},
    mental_health_services: {},
    products: {},
    orthopaedic_bracing: {},
  };
  const keyMap = {
    erectile_dysfunction: "physical_health_services.shockwave_for_ed",
    chronic_pain: "physical_health_services.shockwave_for_chronic_pain",
    physiotherapy: "physical_health_services.physiotherapy",
    chiropractic: "physical_health_services.chiropractic",
    osteopathy: "physical_health_services.osteopathy",
    massage: "physical_health_services.massage",
    acupuncture: "physical_health_services.acupuncture",
    kinesiology: "physical_health_services.kinesiology",
    podiatry: "physical_health_services.podiatry",
    individual_counseling: "mental_health_services.individual_counseling",
    group_counseling: "mental_health_services.group_counseling",
    couple_counseling: "mental_health_services.couple_counseling",
    orthotics: "products.custom_orthotics",
    compression_socks: "products.compression_socks",
    tens_unit: "products.tens_unit",
    heating_pad: "products.heating_pad",
    neck_brace: "orthopaedic_bracing.neck_brace",
    back_brace: "orthopaedic_bracing.back_brace",
    shoulder_brace: "orthopaedic_bracing.shoulder_brace",
    elbow_brace: "orthopaedic_bracing.elbow_brace",
    wrist_brace: "orthopaedic_bracing.wrist_hand_brace",
    hip_brace: "orthopaedic_bracing.hip_pelvis_brace",
    knee_brace: "orthopaedic_bracing.knee_brace",
    ankle_brace: "orthopaedic_bracing.ankle_foot_brace",
  };

  Object.keys(flatData).forEach((key) => {
    const [name, field] = key.split(/_(past|current|interested)$/);
    if (keyMap[name]) {
      const [category, subCategory] = keyMap[name].split(".");
      nestedData[category][subCategory] =
        nestedData[category][subCategory] || {};
      nestedData[category][subCategory][field] = flatData[key];
    }
  });
  return nestedData;
};

const getFormData = async (formId, stepId) => {
  const stepData = await Step5.findOne({ formId, stepId });
  const prevStep4 = await Step4.findOne({ formId });
  if (!stepData) throw { status: 404, message: "Form data not found" };
  return { formData: stepData, prevStepId: prevStep4.stepId };
};

const saveFormData = async (formId, stepId, formData) => {
  const transformedData = transformFormData(formData);

  await Step5.findOneAndUpdate(
    { formId, stepId },
    { ...transformedData, formId, stepId },
    { upsert: true, new: true }
  );

  const newStep6 = await Step6.findOneAndUpdate(
    { formId },
    { $setOnInsert: { formId } },
    { upsert: true, new: true }
  );
  return { path: `/step-6/${formId}/${newStep6.stepId}` };
};

module.exports = { getFormData, saveFormData };
