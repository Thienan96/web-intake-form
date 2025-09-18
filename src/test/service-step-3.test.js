const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step2 = require("../BE/models/Step2");
const Step3 = require("../BE/models/Step3");
const Step4 = require("../BE/models/Step4");
const { getFormData, saveFormData } = require("../BE/services/service-step-3");

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
  await Step2.deleteMany({});
  await Step3.deleteMany({});
  await Step4.deleteMany({});
});

describe("Service Step 3", () => {
  describe("getFormData", () => {
    it("should return form data and prevStepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step2 = await Step2.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        preferred_format: "digital",
      });
      const step3Data = { formId, stepId, general: { is_fainting: false } };
      await Step3.create(step3Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step3Data);
      expect(result.prevStepId).toBe(step2.stepId);
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
    it("should save form data and create step 4", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = { general: { is_fainting: true } };
      await Step2.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        preferred_format: "digital",
      });

      const result = await saveFormData(formId, stepId, formData);
      const step3 = await Step3.findOne({ formId, stepId });
      const step4 = await Step4.findOne({ formId });

      expect(step3.general.is_fainting).toBe(true);
      expect(result.path).toBe(`/step-4/${formId}/${step4.stepId}`);
    });
  });
});
