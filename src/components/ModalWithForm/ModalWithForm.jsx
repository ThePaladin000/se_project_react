import { useEffect } from "react";
import "./ModalWithForm.css";
import { toggleModal } from "../../utils/utils";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({ children, title, name, buttonText }) {
  useEffect(() => {
    const escListener = (e) => {
      if (
        e.key === "Escape" &&
        document.querySelector(".modal.modal__visible")
      ) {
        toggleModal();
      }
    };
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("keydown", escListener);
    };
  }, []);

  return (
    <div className={`modal modal_type_${name}`} onClick={() => toggleModal()}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          onClick={() => toggleModal()}
        >
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
