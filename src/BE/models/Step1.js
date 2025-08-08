const mongoose = require("mongoose");
const { PHONE_REGEX, EMAIL_REGEX, POSTAL_REGEX } = require("./regex");

const step1Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    stepId: { type: String, required: true },
    first_name: { type: String, required: true, minlength: 1, maxlength: 255 },
    last_name: { type: String, required: true, minlength: 1, maxlength: 255 },
    phone: { type: String, required: true, match: PHONE_REGEX },
    email: { type: String, required: true, match: EMAIL_REGEX },
    address_1: { type: String, required: true, minlength: 1, maxlength: 255 },
    address_2: { type: String, maxlength: 255 },
    city: { type: String, required: true, minlength: 1, maxlength: 255 },
    province: {
      type: String,
      required: true,
      enum: [
        "AB",
        "BC",
        "MB",
        "NB",
        "NL",
        "NT",
        "NS",
        "NU",
        "ON",
        "PE",
        "QC",
        "SK",
        "YT",
      ],
    },
    postal: { type: String, required: true, match: POSTAL_REGEX },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    is_voicemail_consent: { type: Boolean, default: false },
    referrer_option: {
      type: String,
      enum: ["", "google", "facebook", "friend", "other"],
    },
    referrer_text: { type: String, maxlength: 255 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step1", step1Schema);
