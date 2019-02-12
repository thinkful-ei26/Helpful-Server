/* Goal is to have this model represent the user following a organization */

const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: Boolean, required: true },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

followingSchema.set("timestamps", true);

followingSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result.__v;
  }
});

module.export = mongoose.model("Following", followingSchema);
