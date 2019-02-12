/* Goal is to have this model represent events */

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true }
});

/* Date the organization was first on the platform*/
eventSchema.set("timestamps", true);

eventSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result.__v;
  }
});

module.exports = mongoose.model("Event", eventSchema);
