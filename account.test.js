const supertest = require("supertest");
const app = require("./index");
const mongoose = require("mongoose");
const { createToken } = require("./services/user");
const Account = require("./models/accountSchema");

//helper variables
const userId = "62337f4a2d31853008b1c136";
const singleAccountId = "6234593ca19b8c10f755fb43";
let token;
let updateAccountId;
let deleteAccountId;

describe("account route", () => {
  beforeAll(async () => {
    token = createToken(userId);
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET all accounts", () => {
    it("should return array of accounts", async () => {
      const response = await supertest(app)
        .get("/api/myaccount")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(expect.arrayContaining([]));
    });
  });

  describe("POST create account", () => {
    beforeAll(async () => {
      await Account.deleteOne({ title: "create test" });
    });

    it("should create new account", async () => {
      const response = await supertest(app)
        .post("/api/myaccount")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "create test", description: "create test" });

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          title: "create test",
          description: "create test",
        })
      );
    });
  });

  describe("GET single account", () => {
    it("should return single account", async () => {
      const response = await supertest(app)
        .get(`/api/myaccount/${singleAccountId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          title: "get single test",
        })
      );
    });
  });

  describe("PATCH update account", () => {
    beforeAll(async () => {
      await Account.create({ title: "update test" });
      const account = await Account.findOne({ title: "update test" });
      updateAccountId = account._id;
    });

    afterAll(async () => {
      await Account.deleteOne({ title: "updated" });
    });

    it("should update existing account and return new", async () => {
      const response = await supertest(app)
        .patch(`/api/myaccount/${updateAccountId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "updated" });

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          title: "updated",
        })
      );
    });
  });

  describe("DELETE account", () => {
    beforeAll(async () => {
      await Account.create({ title: "delete test" });
      const account = await Account.findOne({ title: "delete test" });
      deleteAccountId = account._id;
    });

    it("should delete account", async () => {
      const response = await supertest(app)
        .delete(`/api/myaccount/${deleteAccountId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
});
