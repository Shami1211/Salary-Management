import React from "react";
import { Route, Routes } from "react-router";

import PlayerSalaryForm from "./Components/Finance/User/Add-Salary/SalaryForm";
import PlayerDetails from "./Components/Finance/Admin/Player/PlayerDetails";

import AdminLogin from "./Components/Finance/Admin/AdminLogin/AdminLogin";
import AddSalary from "./Components/Finance/Admin/Player/AddSalary";
import FHome from "./Components/Finance/User/FHome/FHome";
import CoachSalaryForm from "./Components/Finance/Coach/CoachSalaryForm";

import CoachDetails from "./Components/Finance/Admin/Coach/CoachDetails";
import AddCoachSalary from "./Components/Finance/Admin/Coach/AddCoachSalary";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*User*/}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/home" element={<FHome />} />
          <Route path="/userSalary" element={<PlayerSalaryForm />} />
          <Route path="/coachSalary" element={<CoachSalaryForm />} />
         
          <Route path="/employeedetails" element={<PlayerDetails />} />
          <Route path="/coachdetails" element={<CoachDetails />} />

          <Route path="/addsalary/:id" element={<AddSalary />} />
          <Route path="/addcoachsalary/:id" element={<AddCoachSalary />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
