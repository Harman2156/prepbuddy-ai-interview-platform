const mongoose =
require("mongoose");


// ======================================
// RESUME SCHEMA
// ======================================

const resumeSchema =
new mongoose.Schema(

  {

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },



    filename: {

      type: String,

      required: true,
    },



    resumeUrl: {

      type: String,

      required: true,
    },



    atsScore: {

      type: Number,

      default: 0,
    },

  },

  {

    timestamps: true,
  }
);



// ======================================
// EXPORT MODEL
// ======================================

module.exports =
mongoose.model(

  "Resume",

  resumeSchema
);