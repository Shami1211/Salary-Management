import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

function AddLectureSalary() {
  const [inputs, setInputs] = useState({
    name: "",
    module: "",
    type: "",
    gmail: "",
    month: "",
    salary: "",
    bonus: "",
    total: "",
    date: "", // Added date field
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/lecturer-salary/${id}`
        );
        const { data } = response;
        setInputs(data.lecturer);
      } catch (error) {
        console.error("Error fetching lecturer data:", error);
      }
    };
    fetchLecturer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed input is salary or bonus, calculate the total
    if (name === "salary" || name === "bonus") {
      const salary =
        name === "salary" ? parseFloat(value) : parseFloat(inputs.salary);
      const bonus =
        name === "bonus" ? parseFloat(value) : parseFloat(inputs.bonus);
      const total = salary + bonus;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
        total: total.toFixed(2),
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/lecturer-salary/${id}`, inputs);
      window.alert("Salary added successfully!");
      history("/lecturer-details");
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <div>
      <div className="emp_container">
        <div>
          <h1 className="topic_emp">
            Add
            <span className="sub_topic_emp "> Salary</span>
          </h1>
          <br />
          <form onSubmit={handleSubmit} className="emp_form">
            <label className="emp_lable_add" htmlFor="name">
              Name:
            </label>
            <br />
            <input
              className="emp_input"
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              readOnly
            />
            <br />
            <label className="emp_lable_add" htmlFor="module">
              Module:
            </label>
            <br />
            <input
              className="emp_input"
              type="text"
              id="module"
              name="module"
              value={inputs.module}
              onChange={handleChange}
              readOnly
            />
            <br />
            <label className="emp_lable_add" htmlFor="type">
              Type:
            </label>
            <br />
            <input
              className="emp_input"
              type="text"
              id="type"
              name="type"
              value={inputs.type}
              onChange={handleChange}
              readOnly
            />
            <br />
            <label className="emp_lable_add" htmlFor="gmail">
              Gmail:
            </label>
            <br />
            <input
              className="emp_input"
              type="email"
              id="gmail"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              readOnly
            />
            <br />
            <label className="emp_lable_add" htmlFor="month">
              Month:
            </label>
            <br />
            <input
              className="emp_input"
              type="text"
              id="month"
              name="month"
              value={inputs.month}
              onChange={handleChange}
              readOnly
            />
            <br />
            <label className="emp_lable_add" htmlFor="salary">
              Salary:
            </label>
            <br />
            <input
              className="emp_input"
              type="number"
              id="salary"
              name="salary"
              value={inputs.salary}
              onChange={handleChange}
              required
            />
            <br />
            <label className="emp_lable_add" htmlFor="bonus">
              Bonus:
            </label>
            <br />
            <input
              className="emp_input"
              type="number"
              id="bonus"
              name="bonus"
              value={inputs.bonus}
              onChange={handleChange}
              required
            />
            <br />
            <label className="emp_lable_add" htmlFor="total">
              Total:
            </label>
            <br />
            <input
              className="emp_input"
              type="number"
              id="total"
              name="total"
              value={inputs.total}
              readOnly
            />
            <br />
            
            <br /> <br />
            <button type="submit" className="emp_form_button">
              Add Salary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLectureSalary;
