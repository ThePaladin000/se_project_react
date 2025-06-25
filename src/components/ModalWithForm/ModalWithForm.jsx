import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({ children, title, name, buttonText, onClose, isOpen }) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal__visible" : ""}`}
      onClick={isOpen ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
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
