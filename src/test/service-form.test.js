const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Form = require("../BE/models/Form");
const Step1 = require("../BE/models/Step1");
const Step2 = require("../BE/models/Step2");
const Step3 = require("../BE/models/Step3");
const Step4 = require("../BE/models/Step4");
const Step5 = require("../BE/models/Step5");
const Step6 = require("../BE/models/Step6");
const { getAllFormData } = require("../BE/services/service-form");

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
  await Form.deleteMany({});
  await Step1.deleteMany({});
  await Step2.deleteMany({});
  await Step3.deleteMany({});
  await Step4.deleteMany({});
  await Step5.deleteMany({});
  await Step6.deleteMany({});
});

describe("Service Form", () => {
  describe("getAllFormData", () => {
    it("should return data for all steps", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      await Form.create({ formId });
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
      await Step2.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        preferred_format: "digital",
      });

      const result = await getAllFormData(formId);
      expect(result.formId).toBe(formId);
      expect(result.step1.first_name).toBe("John");
      expect(result.step2.preferred_format).toBe("digital");
      expect(result.step3).toBeNull();
      expect(result.step4).toBeNull();
      expect(result.step5).toBeNull();
      expect(result.step6).toBeNull();
    });

    it("should throw 404 if form not found", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      await expect(getAllFormData(formId)).rejects.toMatchObject({
        status: 404,
        message: "Form not found",
      });
    });

    it("should throw 404 if step 1 data not found", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      await Form.create({ formId });
      await expect(getAllFormData(formId)).rejects.toMatchObject({
        status: 404,
        message: "Step 1 data not found",
      });
    });
  });
});
