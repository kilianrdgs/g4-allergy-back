import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt: number = process.env.SALT ? parseInt(process.env.SALT) : 10;
const secret_key: string = process.env.SECRET_KEY || "";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validateLength(v: string) {
      if (v.length < 2) {
        throw new Error("le nom ne doit pas être inférieur à 2 caractères");
      }
    },
    validateMaxLength(v: string) {
      if (v.length > 15) {
        throw new Error("le nom ne doit pas être superieur à 15 caractères");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validateLength(v: string) {
      if (v.length < 6) {
        throw new Error(
          "le mot de passe ne doit pas être inférieur à 6 caractères"
        );
      }
    },
    validate(v: string) {
      if (!/\d/.test(v)) {
        throw new Error("le mot de passe ne doit contenir au moins un chiffre");
      }
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

schema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, secret_key);
  return authToken;
};

schema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("users", schema, "users");

module.exports = User;
