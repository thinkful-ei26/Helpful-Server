'use strict';
/* Goal is to have this model represent users rating organizations */

const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  description: { type: String, required: true },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
});

commentsSchema.set('timestamps', true);
commentsSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
commentsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Comments', commentsSchema);
