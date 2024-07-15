const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    aboutUsImage: {
      type: String,
      default: "",
    },
    experienceCount: {
      type: Number,
      default: 0,
    },
    clientsCount: {
      type: Number,
      default: 0,
    },
    projectsCount: {
      type: Number,
      default: 0,
    },
    service: [
      {
        serviceId: {
          type: String,
          default: "",
        },
        serviceName: {
          type: String,
          default: "",
        },
        serviceImage: {
          type: String,
          default: "",
        },
        serviceText: {
          type: String,
          default: "",
        },
      },
    ],
    project: [
      {
        projectId: {
          type: String,
          default: "",
        },
        projectName: {
          type: String,
          default: "",
        },
        projectImage: {
          type: String,
          default: "",
        },
        projectText: {
          type: String,
          default: "",
        },
      },
    ],
    feedback: [
      {
        feedbackId: {
          type: String,
          default: "",
        },
        feedbackName: {
          type: String,
          default: "",
        },
        feedbackImage: {
          type: String,
          default: "",
        },
        feedbackText: {
          type: String,
          default: "",
        },
        feedbackIndex: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "home",
  }
);
module.exports = mongoose.model("home", homeSchema);
