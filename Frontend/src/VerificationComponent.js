import React, { useEffect } from 'react';
import { useVerification } from './VerificationContext';
import { useNavigate } from 'react-router-dom';
 
const VerificationComponent = ({ children, role }) => {
  const { adminVerified, studentVerified } = useVerification();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin' && !adminVerified) {
      navigate('/verify-admin');
    } else if (role === 'student' && !studentVerified) {
      navigate('/verify-student');
    }
  }, [adminVerified, studentVerified, navigate, role]);

  if ((role === 'admin' && adminVerified) || (role === 'student' && studentVerified)) {
    return children;
  }
  return null;
};

export default VerificationComponent;

