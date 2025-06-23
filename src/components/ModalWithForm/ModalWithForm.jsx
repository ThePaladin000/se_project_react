import { useEffect } from "react";
import "./ModalWithForm.css";
import {
  handleEscClose,
  handleOverlayClick,
  toggleModal,
} from "../../utils/utils";

function ModalWithForm({ children, title, name, buttonText, onClose }) {
  useEffect(() => {
    const escListener = (e) => handleEscClose(e, onClose);
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("keydown", escListener);
    };
  }, [onClose]);

  return (
    <div
      className={`modal modal_type_${name}`}
      onClick={(e) => handleOverlayClick(e, onClose)}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={() => toggleModal()}
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
