import React, { useState, useEffect } from "react";
import axios from "axios";

const Overview = () => {
  const [lecturers, setLecturers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [lecturerTotal, setLecturerTotal] = useState(0);
  const [workerTotal, setWorkerTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchLecturers();
    fetchWorkers();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [lecturers, workers]);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/lecturer-salary");
      setLecturers(response.data.lecturers);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/worker-salary");
      setWorkers(response.data.workers);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const calculateTotals = () => {
    const lecturerSum = lecturers.reduce((acc, lecturer) => acc + parseFloat(lecturer.total || 0), 0);
    const workerSum = workers.reduce((acc, worker) => acc + parseFloat(worker.total || 0), 0);
    setLecturerTotal(lecturerSum);
    setWorkerTotal(workerSum);
    setTotalAmount(lecturerSum + workerSum);
  };

  const generateReport = () => {
    // Your report generation logic here
    alert("Report generated successfully!");

    // Print the report
    window.print();

    // Download the report
    const data = JSON.stringify({ lecturers, workers, totalAmount });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Lecturer Overview</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer._id}>
              <td>{lecturer._id}</td>
              <td>{lecturer.name}</td>
              <td>{lecturer.total || 0}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td>{lecturerTotal}</td>
          </tr>
        </tbody>
      </table>

      <h1>Worker Overview</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker._id}>
              <td>{worker._id}</td>
              <td>{worker.name}</td>
              <td>{worker.total || 0}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td>{workerTotal}</td>
          </tr>
        </tbody>
      </table>

      {/* Total amount */}
      <div>
        <strong>Total Amount for Lecturers and Workers:</strong> {totalAmount}
      </div>

      {/* Generate report button */}
      <button onClick={generateReport}>Generate Report</button>
    </div>
  );
};

export default Overview;
