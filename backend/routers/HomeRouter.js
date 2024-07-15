const express = require("express");
const {
  GetHomeDetails,
  AddToHome,
  ChangeInHome,
  RemoveFromHome,
  AddFeedbackToHome,
} = require("../controllers/HomeController");
var router = express.Router();
router.get("/", GetHomeDetails);
router.post("/", AddToHome);
router.put("/", ChangeInHome);
router.delete("/", RemoveFromHome);
router.put("/feedback", AddFeedbackToHome);

module.exports = router;
