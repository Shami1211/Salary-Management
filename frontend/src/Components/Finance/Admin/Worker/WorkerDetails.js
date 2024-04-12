import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const WorkerDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/worker-salary");
      setWorkers(response.data.workers);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await axios.delete(`http://localhost:8080/worker-salary/${id}`);
        const updatedWorkers = workers.filter((worker) => worker._id !== id);
        setWorkers(updatedWorkers);
        alert("Worker deleted successfully!");
      } catch (error) {
        console.error("Error deleting worker:", error);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Worker Details",
    onafterprint: () => alert("Worker Details Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filtered = workers.filter((worker) =>
      Object.values(worker).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setWorkers(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <div className="con">
      <h1 className="topic_emp">
        Worker
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
            <th className="table_emp_data">Position</th>
            <th className="table_emp_data">Type</th>
            <th className="table_emp_data">Month</th>
            <th className="table_emp_data">Salary (Rs)</th>
            <th className="table_emp_data">ETF (Rs)</th>
            <th className="table_emp_data">Total (Rs)</th>
            <th className="table_emp_data">Actions</th>
          </tr>
        </thead>
        {noResults ? (
          <div>
            <br />
            <h1 className="con_topic">
              No<span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <tbody>
            {workers.map((worker) => (
              <tr key={worker._id}>
                <td className="table_emp_data">{worker.name}</td>
                <td className="table_emp_data">{worker.position}</td>
                <td className="table_emp_data">{worker.type}</td>
                <td className="table_emp_data">{worker.month}</td>
                <td className="table_emp_data">{worker.salary || "not add yet"}</td>
                <td className="table_emp_data">{worker.bonus || "no bonus"}</td>
                <td className="table_emp_data">{worker.total || "not add yet"}</td>
                <td className="table_emp_data">
                  <Link
                    className="update_emp"
                    to={`/addsalary/${worker._id}`}
                  >
                    Add Salary
                  </Link>
                  <button
                    className="dltbtn_emp"
                    onClick={() => handleDelete(worker._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* Additional Table */}
      <h2 className="topic_emp">
        Add Salary for Workers
      </h2>
      <table className="table_emp_detils">
        <thead>
          <tr>
            <th className="table_emp_data">Name</th>
            <th className="table_emp_data">ETF (Rs)</th>
            <th className="table_emp_data">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker._id}>
              <td className="table_emp_data">{worker.name}</td>
              <td className="table_emp_data">{worker.bonus || "no bonus"}</td>
              <td className="table_emp_data">
                <Link
                  className="update_emp"
                  to={`/addsalary/${worker._id}`}
                >
                 Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerDetails;
