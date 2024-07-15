const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    aboutUsImage: {
      type: String,
    },
    teamText: {
      type: String,
    },
    chairmanImage: {
      type: String,
    },
    chairmanName: {
      type: String,
    },
    chairmanDesignation: {
      type: String,
    },
    chairmanExperience: {
      type: String,
    },
    team: [
      {
        teamName: {
          type: String,
          default: "Enter The Name",
        },
        teamImage: {
          type: String,
          default: "",
        },
        teamDesignation: {
          type: String,
          default: "Enter The Designation",
        },
        teamExperience: {
          type: String,
          default: "Enter The Designation",
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "aboutUs",
  }
);
module.exports = mongoose.model("aboutUs", aboutUsSchema);
