const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step5 = require("../BE/models/Step5");
const Step6 = require("../BE/models/Step6");
const { getFormData, saveFormData } = require("../BE/services/service-step-6");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Step5.deleteMany({});
  await Step6.deleteMany({});
});

describe("Service Step 6", () => {
  describe("getFormData", () => {
    it("should return form data and prevStepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step5 = await Step5.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        physical_health_services: {},
      });
      const step6Data = {
        formId,
        stepId,
        is_no_replacement_for_physician_consent: true,
        is_no_replacement_for_physician_consent_initial: "Initial",
      };
      await Step6.create(step6Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step6Data);
      expect(result.prevStepId).toBe(step5.stepId);
    });

    it("should throw 404 if form data not found", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();

      await expect(getFormData(formId, stepId)).rejects.toMatchObject({
        status: 404,
        message: "Form data not found",
      });
    });
  });

  describe("saveFormData", () => {
    it("should save form data with file", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = {
        is_no_replacement_for_physician_consent: true,
        is_no_replacement_for_physician_consent_initial: "Initial",
      };
      const file = { originalname: "signature.png", filename: "sig-123.png" };
      await Step5.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        physical_health_services: {},
      });

      const result = await saveFormData(formId, stepId, formData, file);
      const step6 = await Step6.findOne({ formId, stepId });

      expect(step6.signature_url).toMatchObject({
        originalName: "signature.png",
        url: `/uploads/sig-123.png`,
      });
      expect(result.path).toBe(`/thank-you/${formId}`);
    });

    it("should save form data without file", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = {
        is_no_replacement_for_physician_consent: true,
        is_no_replacement_for_physician_consent_initial: "Initial",
      };
      await Step5.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        physical_health_services: {},
      });

      const result = await saveFormData(formId, stepId, formData, null);
      const step6 = await Step6.findOne({ formId, stepId });

      expect(step6.signature_url).toMatchObject({});
      expect(result.path).toBe(`/thank-you/${formId}`);
    });
  });
});
