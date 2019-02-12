/* Goal is to have this model represent the roles for organizations linking users and orgs */

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

roleSchema.set("timestamps", true);

roleSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result.__v;
  }
});

module.export = mongoose.model("Role", roleSchema);
