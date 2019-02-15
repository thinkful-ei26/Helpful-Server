/* Goal is to have this model represent the roles for organizations linking users and orgs */

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

roleSchema.set("timestamps", true);
roleSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
roleSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model("Role", roleSchema);
