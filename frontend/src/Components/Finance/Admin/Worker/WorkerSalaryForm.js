import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../Emp.css";

function WorkerSalaryForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    position: "",
    type: "",
    month: "",
    salary: "",
    bonus: "",
    total: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8080/worker-salary", inputs);
      if (response.status === 201) {
        window.alert("Registration successful!");
        navigate("/workerdetails");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("Worker name already registered");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleViewWorkers = () => {
    navigate("/workerdetails");
  };

  return (
    <div className="emp_container">
      <div>
        <h1 className="topic_emp">
          Create Your Financial
          <span className="sub_topic_emp "> Account</span>
        </h1>
        <p className="sub_topic_emp cen_sub">
          <b>Worker</b> Financial Account Create Section
        </p>
        <br />
        <form onSubmit={handleSubmit} className="emp_form">
          <label className="emp_lable_add">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            className="emp_input"
            required
          />
          <br />
          <label className="emp_lable_add">Position</label>
          <br />
          <input
            type="text"
            name="position"
            value={inputs.position}
            onChange={handleChange}
            className="emp_input"
            required
          />
          <br />
          <label className="emp_lable_add">Type</label>
          <br />
          <input
            type="text"
            name="type"
            value={inputs.type}
            onChange={handleChange}
            className="emp_input"
            required
          />
          <br />
          <label className="emp_lable_add">Month</label>
          <br />
          <input
            type="text"
            name="month"
            value={inputs.month}
            onChange={handleChange}
            className="emp_input"
            required
          />
          <br />
          
          <br />
          <br />
          <button type="submit" className="emp_form_button">
            Create Account
          </button>
          <p className="go_acc">
            If Do You Have Already Account{" "}
            <span onClick={handleViewWorkers} className="go_acc_sub">
              Click Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default WorkerSalaryForm;
