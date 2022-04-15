const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const { createToken } = require("../services/user");

//helper variables
const userId = "62337f4a2d31853008b1c136";
let token;

describe("currency route", () => {
  beforeAll(async () => {
    token = createToken(userId);
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET currencies", () => {
    it("should return array of currencies", async () => {
      const response = await supertest(app)
        .get("/api/currency")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });
  });
});
