import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import "../css/ScheduleElection.css";
import Alert, { AlertOtpSent, AlertOtpInvalid, AlertStudentNotRegistered, AlertLogin } from "./Alert";
import { useVerification } from "../VerificationContext";

export default function VerifyStudent() {
  const [email, setStudentEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { setStudentVerified } = useVerification();

  let returnHome = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    if (status === "not_registered") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    } else if (status === "registered") {
      setStudentVerified(true);
      const timer = setTimeout(() => {
        navigate("/student", { state: { email } });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, email, navigate, setStudentVerified]);

  let onCheckStudentEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/check-student-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.status === 'otp_sent') {
        setStep(2);
        setStatus(data.status);
      } else {
        setStatus(data.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  let onVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/verify-student-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error verifying OTP:', error);
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
          <h1>Verify Student</h1>
        </div>

        <div className="alerts">
          {status === "otp_sent" && <AlertOtpSent />}
          {status === "not_registered" && <AlertStudentNotRegistered />}
          {status === "otp_invalid" && <AlertOtpInvalid />}
          {status === "registered" && <AlertLogin />}
        </div>

        {step === 1 && ( 
          <form className="cropSubmitForm" onSubmit={onCheckStudentEmail}>
            <div className="mb-3">
              <label htmlFor="studentEmail" className="form-label">Student Email</label>
              <input
                type="email"
                className="form-control"
                id="studentEmail"
                placeholder="Enter student email"
                value={email}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )}

        {step === 2 && (
          <form className="cropSubmitForm" onSubmit={onVerifyOtp}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Verify OTP</button>
          </form>
        )}
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
    </>
  );
}
