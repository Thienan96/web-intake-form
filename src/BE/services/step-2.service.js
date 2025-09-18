const mongoose = require("mongoose");
const Step1 = require("../models/Step1");
const Step2 = require("../models/Step2");
const Step3 = require("../models/Step3");
const { GridFSBucket } = require("mongoose").mongo;

const getFormData = async (formId, stepId) => {
  const stepData = await Step2.findOne({ formId, stepId });
  const prevStep1 = await Step1.findOne({ formId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }

  if (
    stepData.summary_of_assesment_document_url &&
    stepData.summary_of_assesment_document_url.fileId
  ) {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
    const downloadStream = bucket.openDownloadStream(
      stepData.summary_of_assesment_document_url.fileId
    );
    const chunks = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const base64Data = fileBuffer.toString("base64");
    stepData.summary_of_assesment_document_url.url = `data:application/pdf;base64,${base64Data}`;
  }

  return { formData: stepData, prevStepId: prevStep1.stepId };
};

const saveFormData = async (formId, stepId, formData, file) => {
  const updateData = {
    ...formData,
    veteran: {
      is_vet: formData.veteran_is_vet,
      is_active: formData.active_is_vet,
    },
    rcmp: {
      is_vet: formData.veteran_is_rcmp,
      is_active: formData.active_is_rcmp,
    },
    summary_of_assesment_document_url: {},
    formId,
    stepId,
  };

  if (file && formData.preferred_format === "digital") {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
    const files = await mongoose.connection.db
      .collection("uploads.files")
      .find({})
      .toArray();

    // Xóa tất cả các file không chứa "signature" trong tên
    for (const fileDoc of files) {
      if (!fileDoc.filename.toLowerCase().includes("signature")) {
        await bucket.delete(fileDoc._id);
      }
    }

    // Lưu file mới
    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.write(file.buffer);
    uploadStream.end();
    updateData.summary_of_assesment_document_url = {
      originalName: file.originalname,
      fileId: uploadStream.id,
    };
  }

  await Step2.findOneAndUpdate(
    { formId, stepId },
    { $set: updateData },
    { upsert: true, new: true }
  );

  const newStep3 = await Step3.findOneAndUpdate(
    { formId },
    { $setOnInsert: { formId } },
    { upsert: true, new: true }
  );
  return { path: `/step-3/${formId}/${newStep3.stepId}` };
};

module.exports = { getFormData, saveFormData };
