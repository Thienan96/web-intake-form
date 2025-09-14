const { PDFDocument } = require("pdf-lib");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const mongoose = require("mongoose");
const { getAllFormData } = require("./service-form");
const { GridFSBucket } = require("mongoose").mongo;

// Utility functions
const yesNo = (value) => (value ? "Yes" : "No");
const camelCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : phone;
};

// Explicit mappings for fields with spaces
const EXPLICIT_FIELD_MAPPINGS = [
  {
    name: "{step1.address_1} {step1.address_2}",
    getValue: ({ step1 }) => `${step1.address_1} ${step1.address_2}`,
  },
  {
    name: "{step1.referrer_option} {step1.referrer_text}",
    getValue: ({ step1 }) => `${step1.referrer_option} ${step1.referrer_text}`,
  },
  {
    name: "{YesNo(step2.summary_of_assesment)}; {step2.preferred_format}",
    getValue: ({ step2 }) =>
      step2.summary_of_assesment ? `Yes; ${step2.preferred_format}` : "No",
  },
];

// Helper to get nested data value
const getNestedValue = ({ step1, step2, step3, step4, step5, step6 }, path) =>
  path.split(".").reduce((current, key) => current?.[key], {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
  }) ?? "";

// Helper to apply transformation functions
const applyFieldTransformation = (formData, fieldName) => {
  // Check for transformation prefixes and extract the inner field name
  const transformMatch = fieldName.match(
    /^(YesNo|CamelCase|FormatDate|FormatPhone)\(([^)]+)\)$/
  );

  // If no transformation prefix is found, return the raw nested value
  if (!transformMatch) {
    return getNestedValue(formData, fieldName);
  }

  const [, transform, innerFieldName] = transformMatch;
  const value = getNestedValue(formData, innerFieldName);

  // Apply the appropriate transformation based on the prefix
  switch (transform) {
    case "YesNo":
      return yesNo(value);
    case "CamelCase":
      return camelCase(value);
    case "FormatDate":
      return formatDate(value);
    default:
      return formatPhone(value);
  }
};

const exportFormToPDF = async (formId) => {
  try {
    const formData = await getAllFormData(formId);
    const { step6 } = formData;
    const pdfDoc = await PDFDocument.load(
      await fs.readFile(path.resolve(__dirname, "../templates/form.pdf"))
    );
    const form = pdfDoc.getForm();

    // Process all fields
    form.getFields().forEach((field) => {
      const fieldName = field.getName();
      const isTextField = field.constructor.name === "PDFTextField";
      const cleanFieldName = fieldName.replace(/^{|}$/g, "");

      const value = fieldName.includes(" ")
        ? EXPLICIT_FIELD_MAPPINGS.find((m) => m.name === fieldName).getValue(
            formData
          )
        : applyFieldTransformation(formData, cleanFieldName);

      try {
        if (isTextField) {
          form.getTextField(fieldName).setText(value);
        } else if (getNestedValue(formData, cleanFieldName)) {
          form.getCheckBox(fieldName).check();
        }
      } catch (e) {
        console.warn(
          `${isTextField ? "Textfield" : "Checkbox"} not found: ${fieldName}`
        );
      }
    });

    // Handle signature
    if (step6.signature_url.fileId) {
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      const chunks = [];
      for await (const chunk of bucket.openDownloadStream(
        step6.signature_url.fileId
      )) {
        chunks.push(chunk);
      }
      const signatureImage = await pdfDoc.embedPng(Buffer.concat(chunks));
      const signatureField = form.getField("{step6.signature_image}");
      const { x, y, width, height } = signatureField.acroField
        .getWidgets()[0]
        .getRectangle();
      pdfDoc.getPages()[4].drawImage(signatureImage, { x, y, width, height });
    }

    form.flatten({ updateFieldAppearances: true });
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(os.tmpdir(), `form_${formId}_${Date.now()}.pdf`);
    await fs.writeFile(filePath, pdfBytes);
    return { filePath };
  } catch (error) {
    console.error("Export PDF error:", error);
    throw {
      status: 500,
      message: "Failed to export full PDF",
      originalError: error.message,
    };
  }
};

module.exports = { exportFormToPDF };
