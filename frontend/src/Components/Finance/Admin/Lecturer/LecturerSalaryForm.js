import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
//import "../Emp.css";

function LecturerSalaryForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    module: "",
    type: "",
    gmail: "",
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
      const response = await axios.post("http://localhost:8080/lecturer-salary", {
        name: inputs.name,
        module: inputs.module,
        type: inputs.type,
        gmail: inputs.gmail,
        month: inputs.month,
        salary: inputs.salary,
        bonus: inputs.bonus,
        total: inputs.total,
      });

      if (response.status === 201) {
        window.alert("Registration successful!");
        navigate("/lecturer-details");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("Email already registered");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleViewLecturers = () => {
    navigate("/lecturer-details");
  };

  return (
    <div>
      <div className="emp_container">
        <div>
          <h1 className="topic_emp">
            Create Your Financial
            <span className="sub_topic_emp "> Account</span>
          </h1>
          <p className="sub_topic_emp cen_sub">
            <b>Lecturer</b> Financial Account Create Section
          </p>
          <br></br>
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
            <label className="emp_lable_add">Module</label>
            <br />
            <input
              type="text"
              name="module"
              value={inputs.module}
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
            <label className="emp_lable_add">Gmail</label>
            <br />
            <input
              type="email"
              name="gmail"
              value={inputs.gmail}
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
            <label className="emp_lable_add">Date</label>
            <br />
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              className="emp_input"
              required
            />
            <br />
            
            <br />
            <button type="submit" className="emp_form_button">
              Create Account
            </button>
            <p className="go_acc">
              If you already have an account,
              <span onClick={handleViewLecturers} className="go_acc_sub">
                Click Here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LecturerSalaryForm;
