import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/close.svg";

export default function ConfirmDeleteModal({ onDeleteCard, item, onClose }) {
  return (
    <div className="confirm-delete-modal" onClick={onClose}>
      <div
        className="confirm-delete-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="confirm-delete-modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
        <p className="confirm-delete-modal__title">
          Are you sure you want to delete this item?
        </p>
        <p className="confirm-delete-modal__subtitle">
          This action is irreversible.
        </p>
        <div className="confirm-delete-modal__buttons">
          <button
            className="confirm-delete-modal__button-confirm"
            onClick={() => onDeleteCard(item)}
          >
            Yes, delete item
          </button>
          <button
            className="confirm-delete-modal__button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
