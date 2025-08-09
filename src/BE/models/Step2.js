const mongoose = require("mongoose");
const { PHONE_REGEX, MEDAVIE_REGEX } = require("./regex");

const step2Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    stepId: { type: String, required: true },
    veteran: {
      is_vet: { type: Boolean, default: false },
      is_active: { type: Boolean, default: false },
    },
    rcmp: {
      is_vet: { type: Boolean, default: false },
      is_active: { type: Boolean, default: false },
    },
    medavie_bluecross_k: { type: String, match: MEDAVIE_REGEX, default: "" },
    regiment: { type: String, maxlength: 255 },
    disability_award: { type: Boolean },
    disability_award_text: { type: String, maxlength: 255 },
    disability_assesment: { type: Boolean },
    is_disability_assesment_mental: { type: Boolean, default: false },
    is_disability_assesment_physical: { type: Boolean, default: false },
    is_disability_assesment_sexual: { type: Boolean, default: false },
    summary_of_assesment: { type: Boolean },
    preferred_format: {
      type: String,
      enum: ["", "digital", "paper", "do_not_have_copy"],
    },
    summary_of_assesment_document_url: {
      originalName: { type: String },
      url: { type: String },
    },
    emergency_contact_name: { type: String, maxlength: 255 },
    emergency_contact_phone: { type: String, match: PHONE_REGEX },
    emergency_contact_relation: { type: String, maxlength: 255 },
    family_doctor: { type: String, maxlength: 255 },
    family_doctor_phone: { type: String, match: PHONE_REGEX },
    allergies_text: { type: String, maxlength: 2048 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step2", step2Schema);
