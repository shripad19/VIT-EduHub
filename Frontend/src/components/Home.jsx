import React from "react";
import { Link } from 'react-router-dom';
import img1 from "../Assets/images/madmin3.jpg"; 
import img2 from "../Assets/images/vitlogo.png";
import img3 from "../Assets/images/student3.png";
import "../css/Home.css";

export default function Home() {
    return (
        <>
            <header>
                <div className="logo">
                    <div className="logoBlock"><img src={img2} alt="Home Logo" /></div>
                    <div className="logoText">VIT EduHub</div>
                </div>
            </header>
            <div className="introText">
                <p>Welcome to VIT EduHub. Please choose your role to login.</p>
            </div>
            <div className="mainbox">
                <div className="imageContainer">
                    <Link to="/verify-admin">
                        <img src={img1} alt="Admin" className="responsiveImage" />
                    </Link>
                    <div className="imageText">Admin</div>
                </div>
               <div className="imageContainer">
                    <Link to="/verify-student">
                        <img src={img3} alt="Voter Logo" className="responsiveImage" />
                    </Link>
                    <div className="imageText">Student</div>
                </div>
            </div>
        </>
    );
}
