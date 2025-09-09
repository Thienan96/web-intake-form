const mongoose = require("mongoose");
const { PHONE_REGEX, EMAIL_REGEX, POSTAL_REGEX } = require("./regex");
const { v4: uuidv4 } = require("uuid");

const step1Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    first_name: { type: String, required: true, minlength: 1, maxlength: 255 },
    last_name: { type: String, required: true, minlength: 1, maxlength: 255 },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    phone: { type: String, required: true, match: PHONE_REGEX },
    is_voicemail_consent: { type: Boolean, default: false },
    email: { type: String, required: true, match: EMAIL_REGEX },
    addressLookup: { type: String, maxlength: 255 },
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
    referrer_option: {
      type: String,
      enum: ["", "google", "facebook", "friend", "other"],
    },
    referrer_text: { type: String, maxlength: 255 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step1", step1Schema);
