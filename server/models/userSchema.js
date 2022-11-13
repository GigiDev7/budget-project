const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: [isEmail, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not supported",
      },
    },
    categories: {
      type: [String],
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
    },
    residence: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
