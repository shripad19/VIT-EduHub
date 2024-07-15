import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Assets/images/biochem.webp";
import img3 from "../Assets/images/wastemanage.jpg";
import "../css/Admin.css";

const Chem = () => {
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
          <div className="logoText">Welcome to Chemical Department!</div>
        </div>
      </header>
      <div className="admin-options">
        <div className="imageContainer">
          <Link to="/student/chem/biochemical-engineering">
            <img src={img1} alt="Biochemical Engineering" className="responsiveImage" />
          </Link>
          <div className="imageText">Biochemical Engineering</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/chem/waste-management">
            <img src={img3} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Waste Management</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chem;
