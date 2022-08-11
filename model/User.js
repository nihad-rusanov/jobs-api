const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    reuired: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const saltKey = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltKey);
});

UserSchema.methods.createToken = function () {
  return jwt.sign({ userId: this._id, name: this.name }, "NeverGiveUp", {
    expiresIn: "1d",
  });
};

UserSchema.methods.comparePassword = async function (currentPassword) {
  return  await bcrypt.compare(currentPassword, this.password);
  
};

module.exports = mongoose.model("User", UserSchema);
