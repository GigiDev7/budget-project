const app = require("./index");
const mongoose = require("mongoose");
const supertest = require("supertest");

describe("user", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST Login: request is valid", () => {
    it("should login user", async () => {
      const response = await supertest(app)
        .post("/api/user/login")
        .send({ email: "email@gmail.com", password: "123456" });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.anything(),
        email: expect.any(String),
        token: expect.any(String),
      });
      expect(response.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("POST Login: incorrect email or password", () => {
    it("should send error message", async () => {
      const response = await supertest(app)
        .post("/api/user/login")
        .send({ email: "123@gmail.com", password: "123456" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Wrong user email or password");
    });
  });

  describe("POST Register: request is valid", () => {
    it("should create new user", async () => {
      const response = await supertest(app)
        .post("/api/user/register")
        .send({ email: "test1@gmail.com", password: "123456" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("registered");
    });
  });
});
