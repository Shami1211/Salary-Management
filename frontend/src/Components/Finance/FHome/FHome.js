import React from "react";
import Coachimg from "./img/coach.png";
import PlayerImg from "./img/playu.png";
function FHome() {
  return (
    <div>
      <div className="emp_container">
        <div
          className="select_box"
          onClick={() => (window.location.href = "/lecturerSalary")}
        >
          <img src={Coachimg} alt="CoachImage" className="imgicon" />
          <h1>Lecturer</h1>
        </div>
        <div
          className="select_box"
          onClick={() => (window.location.href = "/workerSalary")}
        >
          <img src={PlayerImg} alt="playerImage" className="imgicon" />
          <h1>Worker</h1>
        </div>
        <div
          className="select_box"
          onClick={() => (window.location.href = "/overview")}
        >
         
          <h1>View Chart</h1>
        </div>
      </div>
    </div>
  );
}

export default FHome;
