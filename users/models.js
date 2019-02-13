"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  date: {
    type: Date,
    default: Date.now()
  },
  imgUrl: { type: String, required: true }
});

/* remove the user id from this before production */
UserSchema.methods.serialize = function () {
  return {
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    id: this._id,
    email: this.email || "",
    imgUrl: this.imgUrl
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
