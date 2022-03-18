const supertest = require("supertest");
const app = require("./index");
const mongoose = require("mongoose");
const { createToken } = require("./services/user");
const Category = require("./models/categorySchema");

//helper variables
const userId = "62337f4a2d31853008b1c136";
let token;
let updateCategoryId;
let deleteCategoryId;

describe("category routes", () => {
  beforeAll(async () => {
    token = createToken(userId);
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET get all categories", () => {
    it("should return categories array", async () => {
      const response = await supertest(app)
        .get("/api/category")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(expect.arrayContaining([]));
    });
  });

  describe("POST create category", () => {
    beforeAll(async () => {
      await Category.deleteOne({ title: "create test" });
    });

    it("should create new category", async () => {
      const response = await supertest(app)
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "create test", type: "income" });

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(
        expect.objectContaining({
          title: "create test",
          type: "income",
        })
      );
    });
  });

  describe("PATCH update cateogry", () => {
    beforeAll(async () => {
      await Category.create({ title: "update test", type: "income" });
      const category = await Category.findOne({ title: "update test" });
      updateCategoryId = category._id;
    });

    afterAll(async () => {
      await Category.deleteOne({ title: "updated" });
    });

    it("should update category and return new one", async () => {
      const response = await supertest(app)
        .patch(`/api/category/${updateCategoryId}`)
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

  describe("DELETE category", () => {
    beforeAll(async () => {
      await Category.create({ title: "delete test", type: "income" });
      const category = await Category.findOne({ title: "delete test" });
      deleteCategoryId = category._id;
    });

    it("should delete existing category", async () => {
      const response = await supertest(app)
        .delete(`/api/myaccount/${deleteCategoryId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
});
