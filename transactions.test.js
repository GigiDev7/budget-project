const supertest = require("supertest");
const app = require("./index");
const mongoose = require("mongoose");
const { createToken } = require("./services/user");
const Transaction = require("./models/transactionSchema");

//helper variables
const userId = "62337f4a2d31853008b1c136";
const accountId = "6234593ca19b8c10f755fb43";
const transactionId = "6234796d7cc03a2d2d5b2602";
let token;
let updateTransactionId;
let deleteTransactionId;

describe("transaction routes", () => {
  beforeAll(async () => {
    token = createToken(userId);
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET all transactions", () => {
    it("should return array of transactions", async () => {
      const response = await supertest(app)
        .get(`/api/transactions/${accountId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: expect.any(String),
            amount: expect.any(Number),
          }),
        ])
      );
    });
  });

  describe("GET transactions by category and type", () => {
    it("should return array of transactions filtered by category and type", async () => {
      const response = await supertest(app)
        .get(`/api/transactions/${accountId}?category=home&type=income`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: expect.any(String),
            amount: expect.any(Number),
            category: "home",
            type: "income",
          }),
        ])
      );
    });
  });

  describe("POST create new transaction", () => {
    beforeAll(async () => {
      await Transaction.deleteOne({ title: "create test" });
    });

    it("create new transaction and return it", async () => {
      const response = await supertest(app)
        .post(`/api/transactions/${accountId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ type: "expanse", amount: 200, title: "create test" });

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          type: "expanse",
          amount: 200,
          title: "create test",
          accountId: expect.anything(),
        })
      );
    });
  });

  describe("POST create new transaction ERROR", () => {
    it("should return error", async () => {
      const response = await supertest(app)
        .post(`/api/transactions/${accountId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "create test" });

      expect(response.status).toBe(500);
    });
  });

  describe("GET single transaction", () => {
    it("should return single transaction object", async () => {
      const response = await supertest(app)
        .get(`/api/transactions/transaction/${transactionId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          type: expect.any(String),
          amount: expect.any(Number),
          category: expect.any(String),
        })
      );
    });
  });

  describe("GET single transaction ERROR", () => {
    it("should return error", async () => {
      const response = await supertest(app)
        .get(`/api/transactions/transaction/11`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(500);
    });
  });

  describe("PATCH update existing transaction", () => {
    beforeAll(async () => {
      await Transaction.create({
        type: "income",
        amount: 100,
        category: "update test",
      });
      const transaction = await Transaction.findOne({
        category: "update test",
      });
      updateTransactionId = transaction._id;
    });

    afterAll(async () => {
      await Transaction.deleteOne({ category: "updated" });
    });

    it("should return new updated transaction", async () => {
      const response = await supertest(app)
        .patch(`/api/transactions/transaction/${updateTransactionId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ category: "updated" });

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          category: "updated",
          type: expect.any(String),
          amount: expect.any(Number),
        })
      );
    });
  });

  describe("PATCH update existing transaction", () => {
    it("should return new updated transaction", async () => {
      const response = await supertest(app)
        .patch(`/api/transactions/transaction/11`)
        .set("Authorization", `Bearer ${token}`)
        .send({ category: "updated" });

      expect(response.status).toBe(500);
    });
  });

  describe("DELETE delete existing transaction", () => {
    beforeAll(async () => {
      const transaction = await Transaction.create({
        type: "income",
        amount: 100,
      });
      deleteTransactionId = transaction._id;
    });

    it("should delete transaction", async () => {
      const response = await supertest(app)
        .delete(`/api/transactions/transaction/${deleteTransactionId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });

  describe("DELETE delete existing transaction ERROR", () => {
    it("should return error", async () => {
      const response = await supertest(app)
        .delete(`/api/transactions/transaction/11`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(500);
    });
  });
});
