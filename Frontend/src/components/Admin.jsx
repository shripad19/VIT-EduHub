import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Assets/images/madmin3.jpg";
import img2 from "../Assets/images/student3.png";
import img3 from "../Assets/images/administratorlogo.png";
import "../css/Admin.css";

const Admin = () => { 
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
            <img src={img1} alt="Admin Logo" />
          </div>
          <div className="logoText">Admin Dashboard</div>
        </div>
      </header>
      <div className="admin-options">
        <div className="imageContainer">
          <Link to="/admin/add-student">
            <img src={img2} alt="Add Student" className="responsiveImage" />
          </Link>
          <div className="imageText">Register Student</div>
        </div>
        <div className="imageContainer">
          <Link to="/admin/add-admins">
            <img src={img3} alt="Add Admins" className="responsiveImage" />
          </Link>
          <div className="imageText">Register Admin</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Admin;
