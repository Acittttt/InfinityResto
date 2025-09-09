import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number; // milliseconds
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  title,
  message,
  onClose,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-popup-overlay" onClick={onClose}>
      <div className="success-popup-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="success-popup-close">
          <X size={20} />
        </button>
        
        <div className="success-popup-icon">
          <CheckCircle size={64} />
        </div>
        
        <div className="success-popup-text">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        
        <div className="success-popup-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;