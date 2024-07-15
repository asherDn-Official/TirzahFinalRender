const home = require("../models/HomeModel");
const GetHomeDetails = async (req, res) => {
  try {
    const homeDetails = await home.find();
    res.status(200).json(homeDetails[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddToHome = async (req, res) => {
  const addableValues = await req.body;
  const addedValues = new home({
    bannerImage: addableValues.bannerImage,
    experienceCount: addableValues.experienceCount,
    clientsCount: addableValues.clientsCount,
    projectsCount: addableValues.projectsCount,
  });
  try {
    await addedValues.save();
    res.status(200).json(addedValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddFeedbackToHome = async (req, res) => {
  const addableValues = await req.body;
  try {
    const Home = await home.findOne();
    if (!Home) {
      return res.status(404).json({ error: "Home not found" });
    }
    Home.feedback.push(addableValues);
    await Home.save();
    res.status(200).json(Home[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ChangeInHome = async (req, res) => {
  try {
    const updatedHomeData = req.body;
    await home.findOneAndUpdate({}, updatedHomeData, { new: true }); // Update the first document in the Home collection
    res.status(200).send("Home data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const RemoveFromHome = async (req, res) => {};
module.exports = {
  GetHomeDetails,
  AddToHome,
  ChangeInHome,
  RemoveFromHome,
  AddFeedbackToHome,
};
