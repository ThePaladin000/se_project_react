import "./ModalWithForm.css";

function ModalWithForm({ children, title, name, buttonText }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button type="button" className="modal__close"></button>
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
