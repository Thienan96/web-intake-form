const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step4 = require("../BE/models/Step4");
const Step5 = require("../BE/models/Step5");
const Step6 = require("../BE/models/Step6");
const { getFormData, saveFormData } = require("../BE/services/service-step-5");

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
  await Step4.deleteMany({});
  await Step5.deleteMany({});
  await Step6.deleteMany({});
});

describe("Service Step 5", () => {
  describe("getFormData", () => {
    it("should return form data and prevStepId", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const step4 = await Step4.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        is_neck_spine: false,
      });
      const step5Data = { formId, stepId, physical_health_services: {} };
      await Step5.create(step5Data);

      const result = await getFormData(formId, stepId);
      expect(result.formData).toMatchObject(step5Data);
      expect(result.prevStepId).toBe(step4.stepId);
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
    it("should save transformed data and create step 6", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const stepId = new mongoose.Types.ObjectId().toString();
      const formData = { erectile_dysfunction_past: true };
      await Step4.create({
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        is_neck_spine: false,
      });

      const result = await saveFormData(formId, stepId, formData);
      const step5 = await Step5.findOne({ formId, stepId });
      const step6 = await Step6.findOne({ formId });

      expect(step5.physical_health_services.shockwave_for_ed.past).toBe(true);
      expect(result.path).toBe(`/step-6/${formId}/${step6.stepId}`);
    });
  });
});
