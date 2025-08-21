import { useEffect } from "react";
import "./Modal.css";
import closeIcon from "../../assets/close.svg";

export const Modal = ({ name, onClose, children, isOpen }) => {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal modal_type_${name} modal__visible`} 
      onClick={handleOverlay}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
