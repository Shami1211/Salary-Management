const express = require("express");
const router = express.Router();
const LecturerController = require("../Controllers/LecturerController");

router.get("/", LecturerController.getAllLecturers);
router.post("/", LecturerController.addLecturer);
router.get("/:id", LecturerController.getLecturerById);
router.put("/:id", LecturerController.updateLecturer);
router.delete("/:id", LecturerController.deleteLecturer);

module.exports = router;
