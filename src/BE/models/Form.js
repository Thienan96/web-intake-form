const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const formSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", formSchema);
