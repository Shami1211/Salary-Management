import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [inputs, setInputs] = useState({
    name: "",
    position: "",
    type: "",
    month: "",
    salary: "",
    bonus: "",
    total: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/worker-salary/${id}`
        );
        const { data } = response;
        setInputs(data.worker);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };
    fetchWorker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed input is salary or bonus, calculate the total
    if (name === "salary" || name === "bonus") {
      const salary = name === "salary" ? parseFloat(value) : parseFloat(inputs.salary);
      const bonus = name === "bonus" ? parseFloat(value) : parseFloat(inputs.bonus);
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
      await axios.put(`http://localhost:8080/worker-salary/${id}`, inputs);
      window.alert("Salary added successfully!");
      history("/workerdetails");
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
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
          <label className="emp_lable_add" htmlFor="position">
            Position:
          </label>
          <br />
          <input
            className="emp_input"
            type="text"
            id="position"
            name="position"
            value={inputs.position}
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
          <br /> <br />
          <button type="submit" className="emp_form_button">
            Add Salary
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
