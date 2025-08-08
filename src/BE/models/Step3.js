const mongoose = require("mongoose");

const step3Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    stepId: { type: String, required: true },
    general: {
      fainting: { type: Boolean, default: false },
      headache: { type: Boolean, default: false },
      nervousness: { type: Boolean, default: false },
      numbness: { type: Boolean, default: false },
      paralysis: { type: Boolean, default: false },
    },
    infections: {
      athletes_foot: { type: Boolean, default: false },
      hepatitis: { type: Boolean, default: false },
      hiv: { type: Boolean, default: false },
      tuberculosis: { type: Boolean, default: false },
      herpes: { type: Boolean, default: false },
      warts: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    gastrointestinal: {
      colitis: { type: Boolean, default: false },
      diabetes: { type: Boolean, default: false },
      gout: { type: Boolean, default: false },
      nausea: { type: Boolean, default: false },
      ulcers: { type: Boolean, default: false },
    },
    mental_health: {
      ptsd: { type: Boolean, default: false },
      depression: { type: Boolean, default: false },
      anxiety: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    musculoskeletal: {
      arthritis: { type: Boolean, default: false },
      bursitis: { type: Boolean, default: false },
      cancer: { type: Boolean, default: false },
      fibromyalgia: { type: Boolean, default: false },
      ms: { type: Boolean, default: false },
      osteoporosis: { type: Boolean, default: false },
      pins: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    gender_specific: {
      male: {
        prostate: { type: Boolean, default: false },
        erectile_dysfunction: { type: Boolean, default: false },
      },
      female: {
        pregnancy: { type: Boolean, default: false },
        menopause: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step3", step3Schema);
