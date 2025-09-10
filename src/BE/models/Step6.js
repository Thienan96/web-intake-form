const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const step6Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    is_no_replacement_for_physician_consent: {
      type: Boolean,
    },
    is_no_replacement_for_physician_consent_initial: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    signature_url: {
      originalName: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step6", step6Schema);
