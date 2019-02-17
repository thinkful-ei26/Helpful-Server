/* Goal is to have this model represent users rating organizations */

const mongoose = require("mongoose");

const orgRatingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
});

orgRatingSchema.set("timestamps", true);
orgRatingSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
orgRatingSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model("Orgrating", orgRatingSchema);
