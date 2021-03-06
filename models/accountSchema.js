const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the title"],
    },
    description: {
      type: String,
    },
    currency: {
      type: String,
    },
    sum: {
      type: Number,
      default: 0,
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

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
