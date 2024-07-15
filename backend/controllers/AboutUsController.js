const aboutUs = require("../models/AboutUsModel");
const GetAboutus = async (req, res) => {
  try {
    const aboutUsData = await aboutUs.find();
    res.status(200).send(aboutUsData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddAboutUs = async (req, res) => {
  try {
    const data = req.body;
    const addableData = new aboutUs({
      aboutUsImage: data.aboutUsImage,
      teamText: data.teamText,
      chairmanImage: data.chairmanImage,
    });
    const addedData = await addableData.save();
    res.status(200).send(addedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ChangeInAboutUs = async (req, res) => {
  try {
    const data = req.body;
    // console.log("input : ", data);
    // Construct the update object with specific fields
    const updateObj = {
      $set: {
        aboutUsImage: data.aboutUsImage,
        teamText: data.teamText,
        chairmanImage: data.chairmanImage,
        chairmanName: data.chairmanName,
        chairmanDesignation: data.chairmanDesignation,
        chairmanExperience: data.chairmanExperience,
        team: data.team,
      },
    };
    // Find the aboutUs document and update its fields
    const updatedData = await aboutUs.findOneAndUpdate(
      {},
      updateObj,
      { new: true } // Return the updated document
    );
    // console.log("output : ", updatedData);
    res.status(200).send(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveAboutUs = async (req, res) => {
  try {
    const data = req.body;
    ///not yet created
    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddToTeam = async (req, res) => {
  try {
    const data = req.body;
    const aboutUsDoc = await aboutUs.findOne();

    if (!aboutUsDoc) {
      return res.status(404).json({ error: "About Us not found" });
    }

    // Add the new team member to the team array
    aboutUsDoc.team.push({
      teamName: data.teamName,
      teamImage: data.teamImage,
      teamDesignation: data.teamDesignation,
    });

    // Save the updated aboutUs document
    await aboutUsDoc.save();
    res.status(200).send(aboutUsDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateAMember = async (req, res) => {
  try {
    const data = req.body;
    const aboutUsDoc = await aboutUs.findOne();

    if (!aboutUsDoc) {
      return res.status(404).json({ error: "About Us document not found" });
    }

    // Find the index of the team member to be updated
    const memberIndex = aboutUsDoc.team.findIndex(
      (member) => member._id === data.teamMemberId
    );

    if (memberIndex === -1) {
      return res.status(404).json({ error: "Team member not found" });
    }

    // Update the details of the team member
    aboutUsDoc.team[memberIndex] = {
      ...aboutUsDoc.team[memberIndex],
      ...updatedDetails,
    };

    // Save the updated aboutUs document
    await aboutUsDoc.save();

    res.status(200).send(aboutUsDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveMember = async (req, res) => {
  try {
    const data = req.body;
    const aboutUsDoc = await aboutUs.findOne();

    if (!aboutUsDoc) {
      return res.status(404).json({ error: "About Us document not found" });
    }

    // Filter out the team member by ID
    aboutUsDoc.team = aboutUsDoc.team.filter(
      (member) => member._id !== data.teamMemberId
    );

    // Save the updated aboutUs document
    await aboutUsDoc.save();

    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  GetAboutus,
  AddAboutUs,
  ChangeInAboutUs,
  RemoveAboutUs,
  AddToTeam,
  UpdateAMember,
  RemoveMember,
};
