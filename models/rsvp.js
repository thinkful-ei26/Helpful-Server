/* Goal is to have this model represent the rsvp users can make for events */

const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rsvp: { type: Boolean, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  }
});

rsvpSchema.set("timestamps", true);
rsvpSchema.index({ userId: 1, eventId: 1 }, { unique: true });
rsvpSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model("Rsvp", rsvpSchema);
