/* Goal is to have this model represent the rsvp users can make for events */

const mongoose = require("mongoose");

const rsvpMeetupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rsvp: { type: Boolean, required: true },
    meetupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
});

rsvpMeetupSchema.set("timestamps", true);
rsvpMeetupSchema.index({ userId: 1, eventId: 1 }, { unique: true });
rsvpMeetupSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model("RsvpMeetup", rsvpMeetupSchema);
