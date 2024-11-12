import React from "react";
import "./styles.css";

const Modal = ({ children, isOpen, onClose, wrap }) => {
  if (!isOpen) return null;
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={wrap} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
