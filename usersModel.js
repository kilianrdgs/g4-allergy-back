const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: true },
  password: { type: String, required: true },
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


schema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("utilisateur introuvable");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("mot de passe incorrect");
    return user;
  };

 

schema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = mongoose.model("users", schema, "users");

module.exports = User;
