const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    mobileNumber1: {
      type: String,
    },
    mobileNumber2: {
      type: String,
    },
    mailId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "contactUs",
  }
);
module.exports = mongoose.model("contactUs", contactUsSchema);
