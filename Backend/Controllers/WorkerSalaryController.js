const WorkerSalary = require("../Model/WorkerSalaryModel");

const getAllWorkers = async (req, res, next) => {
  try {
    const workers = await WorkerSalary.find();
    res.status(200).json({ workers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addWorker = async (req, res, next) => {
  try {
    // Check if the name already exists
    const existingWorker = await WorkerSalary.findOne({ name: req.body.name });
    if (existingWorker) {
      return res.status(400).json({ message: "Worker name already registered" });
    }

    // If name doesn't exist, create a new worker
    const newWorker = new WorkerSalary(req.body);
    await newWorker.save();
    res.status(201).json({ newWorker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWorkerById = async (req, res, next) => {
  try {
    const worker = await WorkerSalary.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ worker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateWorker = async (req, res, next) => {
  const id = req.params.id;
  const { name, position, type, month, date, salary, bonus, total } = req.body;

  try {
    let worker = await WorkerSalary.findByIdAndUpdate(id, {
      name: name,
      position: position,
      type: type,
      month: month,
      date: date,
      salary: salary,
      bonus: bonus,
      total: total,
    });
    
    if (!worker) {
      return res.status(404).json({ message: "Unable to update worker details" });
    }

    return res.status(200).json({ worker });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteWorker = async (req, res, next) => {
  try {
    const deletedWorker = await WorkerSalary.findByIdAndDelete(req.params.id);
    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ deletedWorker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllWorkers,
  addWorker,
  getWorkerById,
  updateWorker,
  deleteWorker,
};
