const express = require("express");
const router = express.Router();
const CoachController = require("../Controllers/CoachController");

router.get("/", CoachController.getAllCoach);
router.post("/", CoachController.addCoach);
router.get("/:id", CoachController.getCoachById);
router.put("/:id", CoachController.updateCoach);
router.delete("/:id", CoachController.deleteCoach);

module.exports = router;
