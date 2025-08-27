const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const step5Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    physical_health_services: {
      erectile_dysfunction: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      chronic_pain: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      physiotherapy: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      chiropractic: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      osteopathy: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      massage: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      acupuncture: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      kinesiology: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      podiatry: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
    },
    mental_health_services: {
      individual_counseling: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      group_counseling: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      couple_counseling: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
    },
    products: {
      orthotics: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      compression_socks: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      tens_unit: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      heating_pad: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
    },
    orthopedic_bracing: {
      neck_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      back_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      shoulder_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      elbow_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      wrist_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      hip_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      knee_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
      ankle_brace: {
        past: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        interested: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step5", step5Schema);
