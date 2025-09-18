const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Step1 = require("../BE/models/Step1");
const { getFormData } = require("../BE/services/service-thankyou");

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
});

describe("Service Thankyou", () => {
  describe("getFormData", () => {
    it("should return step 1 data", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      const step1Data = {
        formId,
        stepId: new mongoose.Types.ObjectId().toString(),
        first_name: "Jane",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
        gender: "female",
        phone: "123-456-7890",
        email: "jane@example.com",
        address_1: "456 Main St",
        city: "Vancouver",
        province: "BC",
        postal: "V5K0A1",
      };
      await Step1.create(step1Data);

      const result = await getFormData(formId);
      expect(result.formData).toMatchObject(step1Data);
    });

    it("should throw 404 if form data not found", async () => {
      const formId = new mongoose.Types.ObjectId().toString();
      await expect(getFormData(formId)).rejects.toMatchObject({
        status: 404,
        message: "Form data not found",
      });
    });
  });
});
