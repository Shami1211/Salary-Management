import React from "react";
import { Route, Routes } from "react-router";

import AdminLogin from "./Components/Finance/Admin/AdminLogin/AdminLogin";
import FHome from "./Components/Finance/User/FHome/FHome";

import PlayerSalaryForm from "./Components/Finance/Admin/Lecturer/LecturerSalaryForm";
import PlayerDetails from "./Components/Finance/Admin/Player/PlayerDetails";
import AddSalary from "./Components/Finance/Admin/Player/AddSalary";


import LecturerSalaryForm from "./Components/Finance/Admin/Lecturer/LecturerSalaryForm";
import LecturerDetails from "./Components/Finance/Admin/Lecturer/LecturerDetails";
import AddLecturerSalary from "./Components/Finance/Admin/Lecturer/AddLectureSalary";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*User*/}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/home" element={<FHome />} />
          

          <Route path="/lecturerSalary" element={<LecturerSalaryForm />} />
          <Route path="/lecturer-details" element={<LecturerDetails />} />
          <Route path="/addlecturersalary/:id" element={<AddLecturerSalary />} />


          <Route path="/employeedetails" element={<PlayerDetails />} />
          <Route path="/userSalary" element={<PlayerSalaryForm />} />
          <Route path="/addsalary/:id" element={<AddSalary />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
