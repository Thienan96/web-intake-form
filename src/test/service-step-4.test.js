const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step3 = require("../BE/models/Step3");
const Step4 = require("../BE/models/Step4");
const Step5 = require("../BE/models/Step5");
const { getFormData, saveFormData } = require("../BE/services/service-step-4");

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
  await Step3.deleteMany({});
  await Step4.deleteMany({});
  await Step5.deleteMany({});
});

describe("Service Step 4", () => {
  describe("getFormData", () => {
    it("should return form data and prevStepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step3 = await Step3.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        general: { is_fainting: false },
      });
      const step4Data = { formId, stepId, is_neck_spine: true };
      await Step4.create(step4Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step4Data);
      expect(result.prevStepId).toBe(step3.stepId);
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
    it("should save form data and create step 5", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = { is_neck_spine: true };
      await Step3.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        general: { is_fainting: false },
      });

      const result = await saveFormData(formId, stepId, formData);
      const step4 = await Step4.findOne({ formId, stepId });
      const step5 = await Step5.findOne({ formId });

      expect(step4.is_neck_spine).toBe(true);
      expect(result.path).toBe(`/step-5/${formId}/${step5.stepId}`);
    });
  });
});
