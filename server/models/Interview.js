const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
    },

    type: {
      type: String,
    },

    score: {
      type: Number,
    },

    feedback: {
      type: String,
    },

    questions: [
      {
        question: String,
        answer: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Interview",
    interviewSchema
  );