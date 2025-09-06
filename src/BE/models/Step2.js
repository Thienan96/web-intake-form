const mongoose = require("mongoose");
const { PHONE_REGEX, MEDAVIE_REGEX } = require("./regex");
const { v4: uuidv4 } = require("uuid");

const step2Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    veteran_is_vet: { type: String, default: "false" },
    veteran_is_rcmp: { type: String, default: "false" },
    active_is_vet: { type: String, default: "false" },
    active_is_rcmp: { type: String, default: "false" },
    medavie_bluecross_k: { type: String, match: MEDAVIE_REGEX, default: "" },
    regiment: { type: String, maxlength: 255 },
    disability_award: { type: String },
    disability_award_text: { type: String, maxlength: 255 },
    disability_assesment: { type: String },
    is_disability_assesment_mental: { type: String, default: "false" },
    is_disability_assesment_physical: { type: String, default: "false" },
    is_disability_assesment_sexual: { type: String, default: "false" },
    summary_of_assesment: { type: String },
    summary_of_assesment_document_url: {
      originalName: { type: String },
      url: { type: String },
    },
    emergency_contact_name: { type: String, maxlength: 255 },
    emergency_contact_phone: { type: String, match: PHONE_REGEX },
    emergency_contact_relation: { type: String, maxlength: 255 },
    preferred_format: {
      type: String,
      enum: ["", "digital", "paper", "do_not_have_copy"],
    },
    family_doctor: { type: String, maxlength: 255 },
    family_doctor_phone: { type: String, match: PHONE_REGEX },
    allergies_text: { type: String, maxlength: 2048 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step2", step2Schema);
