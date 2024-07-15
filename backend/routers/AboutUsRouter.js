const express = require("express");
const {
  GetAboutus,
  AddAboutUs,
  ChangeInAboutUs,
  RemoveAboutUs,
  AddToTeam,
  UpdateAMember,
  RemoveMember,
} = require("../controllers/AboutUsController");
var router = express.Router();
router.get("/", GetAboutus);
router.post("/", AddAboutUs);
router.put("/", ChangeInAboutUs);
router.delete("/", RemoveAboutUs);
router.post("/team", AddToTeam);
router.put("/team", UpdateAMember);
router.delete("/team", RemoveMember);

module.exports = router;
