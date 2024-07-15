import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Assets/images/digitalElectro.jpeg";
import img3 from "../Assets/images/comSys.jpg";
import "../css/Admin.css";

const Entc = () => {
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
          <div className="logoText">Welcome to ENTC Department!</div>
        </div> 
      </header>
      <div className="admin-options">
        <div className="imageContainer">
          <Link to="/student/entc/digital-electronics">
            <img src={img1} alt="Add Student" className="responsiveImage" />
          </Link>
          <div className="imageText">Digital Electronics</div>
        </div>
        <div className="imageContainer">
          <Link to="/student/entc/communication-systems">
            <img src={img3} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Communication Systems</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Entc;
