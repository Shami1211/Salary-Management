const express = require("express");
const router = express.Router();
const WorkerSalaryController = require("../Controllers/WorkerSalaryController");

router.get("/", WorkerSalaryController.getAllWorkers);
router.post("/", WorkerSalaryController.addWorker);
router.get("/:id", WorkerSalaryController.getWorkerById);
router.put("/:id", WorkerSalaryController.updateWorker);
router.delete("/:id", WorkerSalaryController.deleteWorker);

module.exports = router;
