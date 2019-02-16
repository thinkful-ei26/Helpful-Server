/* Goal is to have this model represent users rating events */

const mongoose = require("mongoose");

const eventRatingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
});

eventRatingSchema.set("timestamps", true);
eventRatingSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
eventRatingSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model("Eventrating", eventRatingSchema);