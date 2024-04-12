const Lecturer = require("../Model/LecturerSalaryModel"); // Assuming the correct path and file name for the Lecturer model

const getAllLecturers = async (req, res, next) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json({ lecturers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addLecturer = async (req, res, next) => {
  try {
    // Check if the gmail already exists
    const existingLecturer = await Lecturer.findOne({ gmail: req.body.gmail });
    if (existingLecturer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // If email doesn't exist, create a new Lecturer
    const newLecturer = new Lecturer(req.body);
    await newLecturer.save();
    res.status(201).json({ newLecturer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLecturerById = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    res.status(200).json({ lecturer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateLecturer = async (req, res, next) => {
  const id = req.params.id;
  const { name, module, type, gmail, month, salary, bonus, total } = req.body;

  try {
    let lecturer = await Lecturer.findByIdAndUpdate(id, {
      name: name,
      module: module,
      type: type,
      gmail: gmail,
      month: month,
      salary: salary,
      bonus: bonus,
      total: total,
    });

    if (!lecturer) {
      return res
        .status(404)
        .json({ message: "Unable to Update lecturer Details" });
    }

    return res.status(200).json({ lecturer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteLecturer = async (req, res, next) => {
  try {
    const deletedLecturer = await Lecturer.findByIdAndDelete(req.params.id);
    if (!deletedLecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    res.status(200).json({ deletedLecturer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllLecturers,
  addLecturer,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
};
