const express = require("express");
const {
  GetServices,
  AddServices,
  ChangeInServices,
  RemoveServices,
  AddNewServices,
  AddNewWork,
  ChangeInWork,
  GetIndividualService,
  GetWork,
  GetIndividualWork,
  getAllServiceNames,
  saveAllServices,
  UpdateIndividualService,
  UpdateIndividualWork,
} = require("../controllers/ServiceController");
var router = express.Router();
router.get("/", GetServices);
router.get("/name", getAllServiceNames);
router.get("/individual/:id", GetIndividualService);
router.get("/works/:serviceId", GetWork);
router.get("/work/:workId", GetIndividualWork);
router.post("/individualWork/:workId", UpdateIndividualWork);
router.post("/createTotal", AddServices);
router.post("/newService", AddNewServices);
router.post("/save", saveAllServices);
router.post("/saveService/:id", UpdateIndividualService);
router.put("/editService/:id", ChangeInServices);
router.post("/newWork/:id", AddNewWork);
router.put("/editWork/:workId", ChangeInWork);
router.delete("/deleteTotal", RemoveServices);
module.exports = router;
