import Modal from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  onClose,
  isOpen,
  onSubmit,
  isLoading = false,
  secondBtnText,
  onSecondBtnClick,
}) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}
        <div className="modal__button-container">
          <button
            type="submit"
            className="modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
          {secondBtnText && (
            <button
              type="button"
              className="modal__second-button"
              onClick={onSecondBtnClick}
              disabled={isLoading}
            >
              {secondBtnText}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
