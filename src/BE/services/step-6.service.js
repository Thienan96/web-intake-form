const mongoose = require("mongoose");
const Step5 = require("../models/Step5");
const Step6 = require("../models/Step6");
const { GridFSBucket } = require("mongoose").mongo;

const getFormData = async (formId, stepId) => {
  const stepData = await Step6.findOne({ formId, stepId });
  const prevStep5 = await Step5.findOne({ formId });
  if (!stepData) {
    throw { status: 404, message: "Form data not found" };
  }

  if (stepData.signature_url && stepData.signature_url.fileId) {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
    const downloadStream = bucket.openDownloadStream(
      stepData.signature_url.fileId
    );
    const chunks = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const base64Data = fileBuffer.toString("base64");
    stepData.signature_url.url = `data:image/png;base64,${base64Data}`;
  }

  return { formData: stepData, prevStepId: prevStep5.stepId };
};

const saveFormData = async (formId, stepId, formData, file) => {
  const updateData = {
    ...formData,
    signature_url: {},
    formId,
    stepId,
  };

  if (file) {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    // Tìm Step6 document hiện tại
    const existingDoc = await Step6.findOne({ formId, stepId });

    // Xóa file signature cũ của Step6, nếu có
    if (
      existingDoc &&
      existingDoc.signature_url &&
      existingDoc.signature_url.fileId
    ) {
      await bucket.delete(existingDoc.signature_url.fileId);
    }

    // Lưu file mới
    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.write(file.buffer);
    uploadStream.end();
    updateData.signature_url = {
      originalName: file.originalname,
      fileId: uploadStream.id,
    };
  }

  await Step6.findOneAndUpdate(
    { formId, stepId },
    { $set: updateData },
    { upsert: true, new: true }
  );

  return { path: `/thank-you/${formId}` };
};

module.exports = { getFormData, saveFormData };
