import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        closePopup();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    onClose();
  };

  const handleContainerClick = (e) => {
    console.log('in');
    // Check if the clicked element is the container itself, not the children
    if (e.target.classList.contains('popup-container')) {
        console.log('here');
        
      closePopup();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container" onClick={handleContainerClick}>
      <div className="popup-content">
        {children}
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default Popup;