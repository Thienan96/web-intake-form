const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step1 = require("../BE/models/Step1");
const Step2 = require("../BE/models/Step2");
const Form = require("../BE/models/Form");
const {
  getFormData,
  initFormData,
  saveFormData,
} = require("../BE/services/service-step-1");

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
  await Form.deleteMany({});
});

describe("Service Step 1", () => {
  describe("getFormData", () => {
    it("should return form data for valid formId and stepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step1Data = {
        formId,
        stepId,
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
      };
      await Step1.create(step1Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step1Data);
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

  describe("initFormData", () => {
    it("should create form, step1, step2 and return step2 path", async () => {
      const formData = {
        first_name: "Jane",
        last_name: "Doe",
        year: "1990",
        month: "0",
        day: "1",
        gender: "female",
        phone: "123-456-7890",
        email: "jane@example.com",
        address_1: "456 Main St",
        city: "Vancouver",
        province: "BC",
        postal: "V5K0A1",
      };

      const result = await initFormData(formData);
      const form = await Form.findOne();
      const step1 = await Step1.findOne({ formId: form.formId });
      const step2 = await Step2.findOne({ formId: form.formId });

      expect(step1).toMatchObject({
        first_name: "Jane",
        last_name: "Doe",
        birthday: new Date(1990, 0, 1),
        gender: "female",
      });
      expect(result.path).toBe(`/step-2/${form.formId}/${step2.stepId}`);
    });
  });

  describe("saveFormData", () => {
    it("should update step 1 data and create step 2, return step 2 path", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = {
        first_name: "John",
        last_name: "Smith",
        birthday: new Date("1985-05-05"),
        gender: "male",
        phone: "987-654-3210",
        email: "john.smith@example.com",
        address_1: "789 Oak St",
        city: "Calgary",
        province: "AB",
        postal: "T2P4R5",
      };

      await Form.create({ formId });
      await Step1.create({ formId, stepId, ...formData });

      const result = await saveFormData(formId, stepId, formData);
      const step1 = await Step1.findOne({ formId, stepId });
      const step2 = await Step2.findOne({ formId });

      expect(step1).toMatchObject(formData);
      expect(result.path).toBe(`/step-2/${formId}/${step2.stepId}`);
    });
  });
});
