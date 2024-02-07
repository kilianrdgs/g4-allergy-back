import mongoose from 'mongoose';
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
      }]
});

schema.methods.generateAuthTokenAndSaveUser = async function(){
    const authToken = jwt.sign({ _id: this._id.toString()}, 'token');
    this.authTokens.push({authToken});
    await this.save();
    return authToken;
  }

schema.pre("save", async function () {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  });  

const User = mongoose.model("users", schema, "users");

module.exports = User;
