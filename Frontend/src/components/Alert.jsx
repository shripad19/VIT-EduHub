import React from "react";
import "../css/Alert.css";
function AlertSuccess() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      <div className="alert alert-success successAlert" role="alert" >
        Data submitted successfully!!
      </div>
    </>
  );
}
function AlertStudent() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      <div className="alert alert-success successAlert" role="alert" >
        Student registered successfully!!
      </div>
    </>
  );
}
function AlertOtpSent() {
  return (
    <div className="alert alert-success" role="alert">
      OTP Sent successfully!
    </div>
  );
}
function AlertOtpInvalid() {
  return (
    <div className="alert alert-danger" role="alert">
      Invalid OTP!
    </div>
  );
}
function AlertUpdate() {
  return (
    <div className="alert alert-success" role="alert">
      Data updated successfully!
    </div>
  );
}
function AlertAdmin() {
  return (
    <div className="alert alert-success" role="alert">
      Admin registered successfully!
    </div>
  );
}
function AlertLogin() {
  return (
    <div className="alert alert-success" role="alert">
      Login successful!!
    </div>
  );
}
function AlertAdminNotRegistered() {
  return (
    <div className="alert alert-danger" role="alert">
      Invaild Mail ID!
    </div>
  );
}
function AlertStudentNotRegistered() {
  return (
    <div className="alert alert-danger" role="alert">
      Invaild Mail ID!
    </div>
  );
}
function AlertIncorrectPassword() {
  return (
    <div className="alert alert-danger" role="alert">
      Incorrect password!
    </div>
  );
}
export {
  AlertSuccess, AlertStudent, AlertUpdate, AlertOtpSent, AlertOtpInvalid, AlertAdmin, AlertAdminNotRegistered, AlertIncorrectPassword, AlertLogin, AlertStudentNotRegistered
}