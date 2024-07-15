// UnverifiedPopup.jsx
import React from 'react';

const UnverifiedPopup = ({ onClose }) => {
    return (
        <div className="unverified-popup">
            <h2>You are not verified!</h2>
            <p>Please verify your account to access this page.</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default UnverifiedPopup;
