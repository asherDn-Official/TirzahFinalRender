const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    pageImage: {
      type: String,
    },
    pageText: {
      type: String,
    },
    service: [
      {
        serviceName: {
          type: String,
        },
        serviceImage: {
          type: String,
        },
        serviceDescription: {
          type: String,
        },
        works: [
          {
            workName: {
              type: String,
            },
            workDescription: {
              type: String,
            },
            workImage: {
              type: String,
            },
            workSpecification: [
              {
                topic: {
                  type: String,
                },
                detail: {
                  type: String,
                },
                isChecked: {
                  type: Boolean,
                },
              },
            ],
            planning: {
              type: String,
            },
            renderModelBefore: {
              type: String,
            },
            renderModelAfter: {
              type: String,
            },
            gallery: [
              {
                type: String,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    collection: "services",
  }
);
module.exports = mongoose.model("services", servicesSchema);
