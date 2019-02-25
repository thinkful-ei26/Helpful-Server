'use strict';
/* Goal is to have this model represent users rating organizations */

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

commentSchema.set('timestamps', true);
commentSchema.index({ userId: 1, organizationId: 1, comment:1 }, { unique: true });
commentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Comment', commentSchema);
