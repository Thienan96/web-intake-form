const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const step4Schema = new mongoose.Schema(
  {
    formId: { type: String, required: true, default: uuidv4 },
    stepId: { type: String, required: true, default: uuidv4 },
    is_neck_spine: { type: Boolean, default: false },
    is_shoulders: { type: Boolean, default: false },
    is_elbow: { type: Boolean, default: false },
    is_wrist_hand: { type: Boolean, default: false },
    is_hip_pelvis: { type: Boolean, default: false },
    is_groin: { type: Boolean, default: false },
    is_knee: { type: Boolean, default: false },
    is_foot_ankle: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step4", step4Schema);
