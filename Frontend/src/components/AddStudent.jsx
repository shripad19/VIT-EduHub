import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import "../css/ScheduleElection.css";
import Alert, { AlertStudent } from "./Alert";

export default function AddStudent() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState(''); 
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  let returnHome = async (e) => {
    e.preventDefault();
    navigate("/admin");
  }

  useEffect(() => {
    if (status === "ok") {
      const timer = setTimeout(() => {
        navigate("/admin");
      }, 3000);
    }
  }, [status, navigate]);

  let onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, gender, year, branch, email }),
      });
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      <script src="https://kit.fontawesome.com/dd438282bc.js" crossOrigin="anonymous"></script>

      <nav className="navbar bg-body-tertiary expertNavbar">
        <div className="container-fluid backIcon">
          <div className="headingExpert"><i onClick={returnHome} className="fa-solid fa-circle-left"></i></div>
        </div>
      </nav>

      <div className="submitFormBlock">
        <div className="headingForm">
          <h1>Register Student</h1>
        </div>

        <div className="alerts">
          {status === "ok" && <AlertStudent />}
        </div>

        <form className="cropSubmitForm">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name of Student</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} name="gender" id="gender">
              <option value="Select Gender">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="branch" className="form-label">Branch</label>
            <select className="form-control" value={branch} onChange={(e) => setBranch(e.target.value)} name="branch" id="branch">
              <option value="Select Branch">Select Branch</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="ENTC">ENTC</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={onHandleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
    </>
  );
}