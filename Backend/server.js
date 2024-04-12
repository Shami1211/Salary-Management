const express = require("express");
const mongoose = require("mongoose");
const employeeRoute = require("./routes/PlayerSalaryRoute");
const lecturerSalaryRoute = require("./Routes/LecturerSalaryRoute");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/employees", employeeRoute);
app.use("/lecturer-salary", lecturerSalaryRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
