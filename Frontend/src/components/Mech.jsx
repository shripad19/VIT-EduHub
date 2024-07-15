import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Assets/images/thermodynamics.png";
import img3 from "../Assets/images/fluidMech.webp";
import "../css/Admin.css";

const Mech = () => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/student");
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
          <div className="logoText">Welcome to Mechanical Department!</div>
        </div>
      </header>
      <div className="admin-options">
        <div className="imageContainer">
          <Link to="/student/mech/thermodynamics">
            <img src={img1} alt="Add Student" className="responsiveImage" />
          </Link>
          <div className="imageText">Thermodynamics</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/mech/fluid-mechanics">
            <img src={img3} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Fluid Mechanics</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Mech;
