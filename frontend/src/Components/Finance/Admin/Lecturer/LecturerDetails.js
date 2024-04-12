import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/lecturer-salary";

function LecturerDetails() {
  const [lecturers, setLecturers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get(URL);
      setLecturers(response.data.lecturers);
    } catch (error) {
      console.error("Error fetching Lecturers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedLecturers = lecturers.filter((lecturer) => lecturer._id !== id);
        setLecturers(updatedLecturers);
        alert("Lecturer deleted successfully!");
      } catch (error) {
        console.error("Error deleting lecturer:", error);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Lecturer Details",
    onAfterPrint: () => alert("Lecturer Details Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filtered = lecturers.filter((lecturer) =>
      Object.values(lecturer).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setLecturers(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <div>
      <div className="con">
        <h1 className="topic_emp">
          Lecturer
          <span className="sub_topic_emp "> Details..!</span>
        </h1>
        <div>
          <div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              required
              className="emp_input_search"
              placeholder="Search Here..."
            />
            <button onClick={handleSearch} className="emp_search">
              Search
            </button>
          </div>
          <br />
          <button onClick={handlePrint} className="emp_pdf">
            Download Report
          </button>
        </div>
        <table className="table_emp_detils" ref={ComponentsRef}>
          <thead>
            <tr>
              <th className="table_emp_data">Name</th>
              <th className="table_emp_data">Module</th>
              <th className="table_emp_data">Type</th>
              <th className="table_emp_data">Gmail</th>
              <th className="table_emp_data">Month</th>
              <th className="table_emp_data">Date</th>
              <th className="table_emp_data">Salary (Rs)</th>
              <th className="table_emp_data">Bonus (Rs)</th>
              <th className="table_emp_data">Total (Rs)</th>
              <th className="table_emp_data">Actions</th>
            </tr>
          </thead>
          {noResults ? (
            <tbody>
              <tr>
                <td className="table_emp_data" colSpan="10">
                  No Lecturers Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {lecturers.map((lecturer) => (
                <tr key={lecturer._id}>
                  <td className="table_emp_data">{lecturer.name}</td>
                  <td className="table_emp_data">{lecturer.module}</td>
                  <td className="table_emp_data">{lecturer.type}</td>
                  <td className="table_emp_data">{lecturer.gmail}</td>
                  <td className="table_emp_data">{lecturer.month}</td>
                  <td className="table_emp_data">{lecturer.date}</td>
                  <td className="table_emp_data">{lecturer.salary}</td>
                  <td className="table_emp_data">{lecturer.bonus}</td>
                  <td className="table_emp_data">{lecturer.total}</td>
                  <td className="table_emp_data">
                    <Link
                      className="update_emp"
                      to={`/addlecturersalary/${lecturer._id}`}
                    >
                      Add Salary
                    </Link>
                    <button
                      className="dltbtn_emp"
                      onClick={() => handleDelete(lecturer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default LecturerDetails;
