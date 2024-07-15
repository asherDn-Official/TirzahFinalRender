const ContactUs = require("../models/contactUsModel");
const { sendMail } = require("./SendMail");
const GetContactUs = async (req, res) => {
  try {
    const ContactUsData = await ContactUs.find();
    res.status(200).send(ContactUsData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddContactUs = async (req, res) => {
  try {
    const data = req.body;
    const addableData = new ContactUs({
      location: data.location,
      address: data.address,
      mobileNumber1: data.mobileNumber1,
      mobileNumber2: data.mobileNumber2,
      mailId: data.mailId,
    });
    const addedData = await addableData.save();
    res.status(200).send(addedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ChangeInContactUs = async (req, res) => {
  try {
    const data = req.body;

    // Find the ContactUs document and update its fields
    const updatedData = await ContactUs.findOneAndUpdate(
      {},
      data,
      { new: true } // Return the updated document
    );

    res.status(200).send(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveContactUs = async (req, res) => {
  try {
    const data = req.body;
    ///not yet created
    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ContactUsForm = async (req, res) => {
  try {
    const data = req.body;
    const content = `
    this is mail
    `;
    sendMail(process.env.nodeMailer_User, "subject", content);
    res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  GetContactUs,
  AddContactUs,
  ChangeInContactUs,
  RemoveContactUs,
  ContactUsForm,
};
