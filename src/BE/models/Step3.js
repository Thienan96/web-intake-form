const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const step3Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    general: {
      is_fainting: { type: Boolean, default: false },
      is_headache: { type: Boolean, default: false },
      is_nervousness: { type: Boolean, default: false },
      is_numbness: { type: Boolean, default: false },
      is_paralysis: { type: Boolean, default: false },
    },
    infections: {
      is_athlete_foot: { type: Boolean, default: false },
      is_hepatitis: { type: Boolean, default: false },
      is_hiv: { type: Boolean, default: false },
      is_tuberculosis: { type: Boolean, default: false },
      is_herpes: { type: Boolean, default: false },
      is_warts: { type: Boolean, default: false },
      is_other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    gastrointestinal: {
      is_colitis: { type: Boolean, default: false },
      is_diabetes: { type: Boolean, default: false },
      is_gout: { type: Boolean, default: false },
      is_nausea: { type: Boolean, default: false },
      is_ulcers: { type: Boolean, default: false },
    },
    mental: {
      is_ptsd: { type: Boolean, default: false },
      is_depression: { type: Boolean, default: false },
      is_anxiety: { type: Boolean, default: false },
      is_other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    musculoskeletal: {
      is_arthritis: { type: Boolean, default: false },
      is_bursitis: { type: Boolean, default: false },
      is_cancer: { type: Boolean, default: false },
      is_fibromyalgia: { type: Boolean, default: false },
      is_multiple_sclerosis: { type: Boolean, default: false },
      is_osteoporosis: { type: Boolean, default: false },
      is_pins_plates: { type: Boolean, default: false },
      is_other: { type: Boolean, default: false },
      other_text: { type: String, maxlength: 255 },
    },
    sexual: {
      is_erectile_dysfunction: { type: Boolean, default: false },
      is_prostate: { type: Boolean, default: false },
      is_pregnant: { type: Boolean, default: false },
      is_sexual_dysfunction: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step3", step3Schema);
