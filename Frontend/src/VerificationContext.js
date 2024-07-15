// VerificationContext.js
import React, { createContext, useContext, useState } from 'react';

const VerificationContext = createContext();

export const useVerification = () => {
  return useContext(VerificationContext);
};

export const VerificationProvider = ({ children }) => {
  const [adminVerified, setAdminVerified] = useState(false);
  const [studentVerified, setStudentVerified] = useState(false);

  return (
    <VerificationContext.Provider value={{ adminVerified, setAdminVerified, studentVerified, setStudentVerified }}>
      {children}
    </VerificationContext.Provider>
  );
};
