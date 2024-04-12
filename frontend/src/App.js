import React from "react";
import { Route, Routes } from "react-router";

//Admin Dashboard
import AdminLogin from "./Components/Finance/Admin/AdminLogin/AdminLogin";
import FHome from "./Components/Finance/FHome/FHome";
import Overview from "./Components/Finance/Overview";

//Worker
import WorkerSalaryForm from "./Components/Finance/Admin/Worker/WorkerSalaryForm";
import WorkerDetails from "./Components/Finance/Admin/Worker/WorkerDetails";
import AddSalary from "./Components/Finance/Admin/Worker/AddSalary";

//Lecture
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
          <Route path="/overview" element={<Overview />} />

          <Route path="/lecturerSalary" element={<LecturerSalaryForm />} />
          <Route path="/lecturer-details" element={<LecturerDetails />} />
          <Route path="/addlecturersalary/:id" element={<AddLecturerSalary />} />


          <Route path="/workerdetails" element={<WorkerDetails />} />
          <Route path="/workerSalary" element={<WorkerSalaryForm />} />
          <Route path="/addsalary/:id" element={<AddSalary />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
