const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    type: {
      type: String,
      required: [true, "Category type is required"],
    },
    enum: {
      values: ["income", "expanse"],
      message: "{VALUE} is not supported",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
