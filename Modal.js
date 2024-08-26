// src/components/Modal.js
import React from 'react';
import './Modal.css';  // Ensure this CSS file exists and is correctly imported

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
