/* Goal is to have this model represent meetups */

const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    geoLocation: { type: Object, required: true},
    date: { type: String, required: true },
    contact: { type: String, required: true },
    imgUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

/* Date the organization was first on the platform*/
meetupSchema.set("timestamps", true);
meetupSchema.index({ userId: 1 }, { unique: true });
meetupSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model("Meetup", meetupSchema);
