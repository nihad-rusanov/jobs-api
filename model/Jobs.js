const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company"],
      maxlength: 50,
    },
    postion: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Jobs", JobSchema);
