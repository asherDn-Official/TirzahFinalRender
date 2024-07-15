const service = require("../models/ServicesModel");
const GetServices = async (req, res) => {
  try {
    const serviceDetails = await service.find();
    res.status(200).json(serviceDetails[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddServices = async (req, res) => {
  const addableValues = await req.body;
  const addedValues = new service({
    pageImage: addableValues.pageImage,
    pageText: addableValues.pageText,
  });
  try {
    await addedValues.save();
    res.status(200).json(addedValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveAllServices = async (req, res) => {
  try {
    const updatedServiceData = req.body;
    await service.findOneAndUpdate({}, updatedServiceData, { new: true }); // Update the first document in the Home collection
    res.status(200).send("Home data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddNewServices = async (req, res) => {
  const addableValues = {
    serviceName: "Add the Data",
    serviceImage: "/image/service-image.png",
    serviceDescription: "Add the Data",
    works: [],
  };

  try {
    // Assuming you have some criteria to identify the document you want to update
    const updatedServices = await service.findOneAndUpdate(
      {},
      { $push: { service: addableValues } },
      { new: true }
    );

    // No need to call save, as findOneAndUpdate already updates the document
    // console.log(updatedServices);
    res.status(200).json(updatedServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ChangeInServices = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedHomeData = req.body;
    const updatedService = await service.findOneAndUpdate(
      { "service._id": id }, // Match condition
      { $set: { "service.$": updatedHomeData } }, // Update fields for the matched service
      { new: true } // Return the updated document
    ); // Update the first document in the Home collection
    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const RemoveServices = async (req, res) => {};
const AddNewWork = async (req, res) => {
  const serviceId = req.params.id;
  const newWork = {
    workName: "enter data",
    workDescription: "enter data",
    workImage: "/image/empty-image.png",
    workSpecification: [],
    planning: "/image/demo-imageeee.png",
    renderModelBefore: "/image/empty-image.png",
    renderModelAfter: "/image/empty-image.png",
    gallery: ["/image/galary-demo-image.png"],
  };

  try {
    // Find the service document by its ID
    const updateService = await service.findOne({ "service._id": serviceId });

    if (!updateService) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find the index of the correct service within the 'service' array
    const serviceIndex = updateService.service.findIndex(
      (service) => service._id.toString() === serviceId
    );

    // Check if the service was found
    if (serviceIndex === -1) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Push the new work to the 'works' array of the found service
    updateService.service[serviceIndex].works.push(newWork);

    // Save the updated document
    const updatedService = await updateService.save();

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ChangeInWork = async (req, res) => {
  const workId = req.params.workId; // Assuming you have a route parameter for the work ID
  const updatedWork = req.body;

  try {
    // Find the service document containing the work with the specified workId
    const updateService = await service.findOne({
      "service.works._id": workId,
    });

    if (!updateService) {
      return res.status(404).json({ error: "Work not found" });
    }

    // Find the index of the service within the 'service' array
    const serviceIndex = updateService.service.findIndex((service) =>
      service.works.some((work) => work._id.toString() === workId)
    );

    // Find the index of the work within the 'works' array
    const workIndex = updateService.service[serviceIndex].works.findIndex(
      (work) => work._id.toString() === workId
    );

    // Update the existing work
    updateService.service[serviceIndex].works[workIndex] = updatedWork;

    // Save the updated document
    const updatedService = await updateService.save();

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const GetIndividualService = async (req, res) => {
  const id = req.params.id;

  try {
    const serviceDetails = await service.findOne(
      { "service._id": id },
      {
        "service.$": 1,
      }
    );
    res.status(200).json(serviceDetails.service[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateIndividualService = async (req, res) => {
  const id = req.params.id; // Assuming you're passing the service ID through the route parameter
  const updatedServiceData = req.body; // Assuming you're sending updated service data in the request body

  try {
    // Find the service document by its ID
    const updatedService = await service.findOneAndUpdate(
      { "service._id": id }, // Match condition
      { $set: { "service.$": updatedServiceData } }, // Update fields for the matched service
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetWork = async (req, res) => {
  const { serviceId } = req.params; // Corrected from req.params.serviceId

  try {
    let services = {};
    if (serviceId !== "all") {
      services = await service.find({ "service._id": serviceId });
    } else {
      services = await service.find({});
    }

    if (!services || services.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    let works = {};
    if (serviceId === "all") {
      works = services.flatMap((service) =>
        service.service.flatMap((s) =>
          s.works.map((work) => ({
            workId: work._id,
            workName: work.workName,
            workImage: work.workImage,
            workDescription: work.workDescription,
            serviceName: s.serviceName,
          }))
        )
      );
    } else {
      works = services.flatMap((service) =>
        service.service.flatMap((s) => {
          // Check if the current service's ID matches the specified serviceId
          if (s._id.toString() === serviceId) {
            return s.works.map((work) => ({
              workId: work._id,
              workName: work.workName,
              workImage: work.workImage,
              workDescription: work.workDescription,
              serviceName: s.serviceName,
            }));
          }
          return []; // Return an empty array if the service ID doesn't match
        })
      );
    }
    res.status(200).json(works);
  } catch (error) {
    console.error("Error retrieving works:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetIndividualWork = async (req, res) => {
  const workId = req.params.workId;

  // console.log("WorkId", workId);
  try {
    // Find the service that contains the work with the specified _id
    const update = await service.findOne({ "service.works._id": workId });

    if (!update) {
      return res.status(404).json({ error: "Work not found" });
    }

    // Traverse through the service's works array to find the work with the specified _id
    const work = update.service.reduce((foundWork, currentService) => {
      const found = currentService.works.find(
        (work) => work._id.toString() === workId
      );
      return found ? found : foundWork;
    }, null);

    if (!work) {
      return res.status(404).json({ error: "Work not found" });
    }

    // Send the found work back to the client
    res.status(200).json(work);
  } catch (error) {
    console.error("Error retrieving work:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const UpdateIndividualWork = async (req, res) => {
  const workId = req.params.workId; // Assuming you have a route parameter for the work ID
  const updatedWorkData = req.body; // Assuming you're sending updated work data in the request body
  // console.log(workId);
  // console.log("work", updatedWorkData);
  try {
    // Find the service document containing the work with the specified workId
    const updateService = await service.findOne({
      "service.works._id": workId,
    });

    if (!updateService) {
      return res.status(404).json({ error: "Work not found" });
    }

    // Find the index of the service within the 'service' array
    const serviceIndex = updateService.service.findIndex((service) =>
      service.works.some((work) => work._id.toString() === workId)
    );

    // Find the index of the work within the 'works' array
    const workIndex = updateService.service[serviceIndex].works.findIndex(
      (work) => work._id.toString() === workId
    );

    // Update the existing work
    updateService.service[serviceIndex].works[workIndex] = updatedWorkData;

    // Save the updated document
    const updatedService = await updateService.save();

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllServiceNames = async (req, res) => {
  try {
    const result = await service.aggregate([
      // Unwind the 'service' array to access each service document separately
      { $unwind: "$service" },
      // Project both '_id' and 'serviceName' fields
      {
        $project: {
          _id: "$service._id",
          serviceName: "$service.serviceName",
        },
      },
    ]);
    const serviceNames = result.map((doc) => ({
      _id: doc._id,
      serviceName: doc.serviceName,
    }));
    res.status(200).json(serviceNames);
  } catch (error) {
    console.error("Error retrieving service names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  GetServices,
  AddServices,
  ChangeInServices,
  RemoveServices,
  AddNewServices,
  AddNewWork,
  ChangeInWork,
  GetIndividualService,
  UpdateIndividualService,
  GetWork,
  GetIndividualWork,
  UpdateIndividualWork,
  getAllServiceNames,
  saveAllServices,
};
