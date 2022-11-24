const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: Schema.Types.ObjectId,
    // default: () => new Types.ObjectId(),

  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = reactionSchema;
