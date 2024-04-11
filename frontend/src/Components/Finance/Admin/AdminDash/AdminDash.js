import React from "react";
import Coachimg from "./img/coach.png";
import PlayerImg from "./img/playu.png";
function AdminDash() {
  return (
    <div>
      <div className="emp_container">
        <div
          className="select_box"
          onClick={() => (window.location.href = "/coachdetails")}
        >
          <img src={Coachimg} alt="CoachImage" className="imgicon" />
          <h1>Coach</h1>
        </div>
        <div
          className="select_box"
          onClick={() => (window.location.href = "/employeedetails")}
        >
          <img src={PlayerImg} alt="playerImage" className="imgicon" />
          <h1>Player</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
