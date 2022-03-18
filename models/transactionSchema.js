const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["expanse", "income"],
      required: [true, "Transaction type is required"],
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    currency: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
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

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
