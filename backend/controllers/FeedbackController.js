const feedback = require("../models/FeedbackModel");
const home = require("../models/HomeModel");
const GetFeedback = async (req, res) => {
  try {
    // const { data } = req.body; // Extracting ids from req.body

    // // Fetch all feedbacks and home feedbacks
    // const feedbacks = await feedback.find();
    // const homeFeedbacks = await home.find();

    // // Filter out the feedback with the specified ID from feedbacks
    // let filteredFeedbacks = feedbacks.filter(
    //   (feedback) => String(feedback._id) !== data
    // );

    // // Filter out the feedback with the specified ID from home feedbacks
    // homeFeedbacks.forEach((homeFeedback) => {
    //   filteredFeedbacks = filteredFeedbacks.filter(
    //     (feedback) =>
    //       !homeFeedback.feedback.find(
    //         (fb) => String(fb.feedbackId) === String(feedback._id)
    //       )
    //   );
    // });

    // if (filteredFeedbacks.length === 0) {
    //   return res.status(400).json({ message: "No Feedbacks Found" });
    // }

    // res.status(200).json(filteredFeedbacks);

    const feedbacks = await feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddFeedback = async (req, res) => {
  try {
    const { feedbackName, feedbackImage, feedbackEmail, feedbackText } =
      req.body;
    if (!feedbackName || !feedbackText) {
      return res.status(400).json({ message: "Enter Proper Details" });
    }
    const newFeedback = new feedback({
      feedbackName,
      feedbackEmail,
      feedbackImage,
      feedbackText,
    });
    await newFeedback.save();
    res.status(200).json(newFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const EditFeedback = async (req, res) => {
  try {
    const { feedbackName, feedbackImage, feedbackText, id } = req.body;
    const updatedFeedback = await feedback.findByIdAndUpdate(
      id,
      {
        feedbackName,
        feedbackImage,
        feedbackText,
      },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(400).json({ message: "No Feedback Found" });
    }
    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const DeleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFeedback = await feedback.findByIdAndDelete({ _id: id });
    if (!deletedFeedback) {
      return res.status(400).json({ message: "No Feedback Found" });
    }
    // console.log(deletedFeedback);
    res.status(200).json(deletedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  GetFeedback,
  AddFeedback,
  EditFeedback,
  DeleteFeedback,
};
