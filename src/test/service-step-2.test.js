const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step1 = require("../BE/models/Step1");
const Step2 = require("../BE/models/Step2");
const Step3 = require("../BE/models/Step3");
const { getFormData, saveFormData } = require("../BE/services/service-step-2");

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
  await Step1.deleteMany({});
  await Step2.deleteMany({});
  await Step3.deleteMany({});
});

describe("Service Step 2", () => {
  describe("getFormData", () => {
    it("should return form data and prevStepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step1 = await Step1.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        first_name: "John",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
        gender: "male",
        phone: "123-456-7890",
        email: "john@example.com",
        address_1: "123 Main St",
        city: "Toronto",
        province: "ON",
        postal: "A1B2C3",
      });
      const step2Data = { formId, stepId, preferred_format: "digital" };
      await Step2.create(step2Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step2Data);
      expect(result.prevStepId).toBe(step1.stepId);
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
        preferred_format: "digital",
        veteran_is_vet: true,
        active_is_vet: false,
        veteran_is_rcmp: false,
        active_is_rcmp: false,
      };
      const file = {
        originalname: "test.pdf",
        filename: "test-123.pdf",
      };
      await Step1.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        first_name: "John",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
        gender: "male",
        phone: "123-456-7890",
        email: "john@example.com",
        address_1: "123 Main St",
        city: "Toronto",
        province: "ON",
        postal: "A1B2C3",
      });

      const result = await saveFormData(formId, stepId, formData, file);
      const step2 = await Step2.findOne({ formId, stepId });
      const step3 = await Step3.findOne({ formId });

      expect(step2.summary_of_assesment_document_url).toMatchObject({
        originalName: "test.pdf",
        url: `/uploads/test-123.pdf`,
      });
      expect(result.path).toBe(`/step-3/${formId}/${step3.stepId}`);
    });

    it("should save form data without file", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = {
        preferred_format: "paper",
        veteran_is_vet: false,
        active_is_vet: false,
        veteran_is_rcmp: false,
        active_is_rcmp: false,
      };
      await Step1.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        first_name: "John",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
        gender: "male",
        phone: "123-456-7890",
        email: "john@example.com",
        address_1: "123 Main St",
        city: "Toronto",
        province: "ON",
        postal: "A1B2C3",
      });

      const result = await saveFormData(formId, stepId, formData, null);
      const step2 = await Step2.findOne({ formId, stepId });
      const step3 = await Step3.findOne({ formId });

      expect(step2.summary_of_assesment_document_url).toMatchObject({});
      expect(result.path).toBe(`/step-3/${formId}/${step3.stepId}`);
    });
  });
});
