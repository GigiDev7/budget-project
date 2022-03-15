const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["expanse", "income"],
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
    ammount: {
      type: Number,
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
