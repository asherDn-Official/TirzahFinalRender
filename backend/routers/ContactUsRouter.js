const express = require("express");
const {
  GetContactUs,
  AddContactUs,
  ChangeInContactUs,
  RemoveContactUs,
  ContactUsForm,
} = require("../controllers/ContactUsController");
var router = express.Router();
router.get("/", GetContactUs);
router.post("/", AddContactUs);
router.post("/form", ContactUsForm);
router.put("/", ChangeInContactUs);
router.delete("/", RemoveContactUs);

module.exports = router;
