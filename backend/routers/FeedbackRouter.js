const express = require("express");
const {
  GetFeedback,
  AddFeedback,
  EditFeedback,
  DeleteFeedback,
} = require("../controllers/FeedbackController");
var router = express.Router();
router.post("/get", GetFeedback);
router.post("/", AddFeedback);
router.put("/", EditFeedback);
router.delete("/:id", DeleteFeedback);

module.exports = router;
