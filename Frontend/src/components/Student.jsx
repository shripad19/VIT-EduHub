import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Assets/images/comp.jpg";
import img2 from "../Assets/images/student3.png";
import img3 from "../Assets/images/entc.jpeg";
import img4 from "../Assets/images/mech.jpeg";
import img5 from "../Assets/images/chem.jpg";
import "../css/Admin.css";

const Student = () => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  return (
    <>
    <script src="https://kit.fontawesome.com/dd438282bc.js" crossOrigin="anonymous"></script>
    <nav className="navbar bg-body-tertiary tempback">
        <div className="container-fluid backIcon">
          <div className="headingExpert">
            <i className="fas fa-circle-left" onClick={returnHome}></i>
          </div>
        </div>
    </nav>
    
    <div className="admin">
      
      <header className="admin-header">
        <div className="logo">
          <div className="logoBlock">
            <img src={img2} alt="Admin Logo" />
          </div>
          <div className="logoText">Student Dashboard</div>
        </div>
      </header>
      <div className="admin-options">
        <div className="imageContainer">
          <Link to="/student/comp">
            <img src={img1} alt="Add Student" className="responsiveImage" />
          </Link>
          <div className="imageText">Computer Engineering</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/entc">
            <img src={img3} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">ENTC</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/mech">
            <img src={img4} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Mechanical Engineering</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/chem">
            <img src={img5} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Chemical Engineering</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Student;
