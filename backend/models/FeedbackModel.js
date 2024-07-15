const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedbackName: {
      type: String,
    },
    feedbackEmail: {
      type: String,
    },
    feedbackImage: {
      type: String,
    },
    feedbackText: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "feedback",
  }
);
module.exports = mongoose.model("feedback", feedbackSchema);
