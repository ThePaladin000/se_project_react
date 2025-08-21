import "./ConfirmDeleteModal.css";
import Modal from "../Modal/Modal";

export default function ConfirmDeleteModal({
  onDeleteCard,
  item,
  onClose,
  isLoading,
}) {
  return (
    <Modal name="confirm-delete" onClose={onClose} isOpen={true}>
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
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="confirm-delete-modal__button-cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
