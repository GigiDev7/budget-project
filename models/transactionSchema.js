const mongoose = require("mongoose");
const Account = require("./accountSchema");

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
    transactionDate: {
      type: Date,
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

transactionSchema.post("save", async function (doc, next) {
  const account = await Account.findById(doc.accountId);
  if (doc.type === "income") {
    account.sum += doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  } else {
    account.sum -= doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  }

  next();
});

transactionSchema.post(/Delete$/, async function (doc, next) {
  const account = await Account.findById(doc.accountId);
  if (doc.type === "income") {
    account.sum -= doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  } else {
    account.sum += doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  }

  next();
});

transactionSchema.pre(/Update$/, async function (next) {
  const transactionId = this.getQuery();
  const oldTransaction = await Transaction.findById(transactionId);

  const account = await Account.findById(oldTransaction.accountId);
  if (oldTransaction.type === "income") {
    account.sum -= oldTransaction.amount;
    await Account.findByIdAndUpdate(oldTransaction.accountId, account);
  } else {
    account.sum += oldTransaction.amount;
    await Account.findByIdAndUpdate(oldTransaction.accountId, account);
  }

  next();
});

transactionSchema.post(/Update$/, async function (doc, next) {
  const account = await Account.findById(doc.accountId);
  if (doc.type === "income") {
    account.sum += doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  } else {
    account.sum -= doc.amount;
    await Account.findByIdAndUpdate(doc.accountId, account);
  }

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
