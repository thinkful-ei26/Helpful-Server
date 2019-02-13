/* Goal is to have this model represent events */

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  contact: { type: String, required: true },
  imgUrl: { type: String, required: true }
});

/* Date the organization was first on the platform*/
eventSchema.set("timestamps", true);
eventSchema.index({ name: 1, description: 1 }, { unique: true });
eventSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model("Event", eventSchema);
