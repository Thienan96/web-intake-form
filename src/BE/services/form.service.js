const Step1 = require("../models/Step1");
const Step2 = require("../models/Step2");
const Step3 = require("../models/Step3");
const Step4 = require("../models/Step4");
const Step5 = require("../models/Step5");
const Step6 = require("../models/Step6");
const Form = require("../models/Form");

const getAllFormData = async (formId) => {
  const form = await Form.findOne({ formId });
  if (!form) {
    throw { status: 404, message: "Form not found" };
  }

  const [step1, step2, step3, step4, step5, step6] = await Promise.all([
    Step1.findOne({ formId }),
    Step2.findOne({ formId }),
    Step3.findOne({ formId }),
    Step4.findOne({ formId }),
    Step5.findOne({ formId }),
    Step6.findOne({ formId }),
  ]);

  if (!step1) {
    throw { status: 404, message: "Step 1 data not found" };
  }

  return {
    formId,
    step1: step1 || null,
    step2: step2 || null,
    step3: step3 || null,
    step4: step4 || null,
    step5: step5 || null,
    step6: step6 || null,
  };
};

module.exports = { getAllFormData };
