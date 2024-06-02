

import mongoose from "mongoose";

//creating schema
const schema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  speakers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
},{
  timestamps: true,
});

export const Room = mongoose.model("Room", schema);
