import { useState, useContext } from "react";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ item, onClose, onDeleteCard, isLoading }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const isOwn = item?.owner === currentUser?._id;

  return (
    <>
      <Modal name="item" onClose={onClose} isOpen={!!item}>
        <img
          src={item?.imageUrl}
          alt={item?.name}
          className="item-modal__image"
        />
        <div className="item-modal__content">
          <div className="item-modal__caption">
            <p className="item-modal__caption-name">{item?.name}</p>
            <p className="item-modal__caption-weather">
              Weather: {item?.weather}
            </p>
          </div>
          <div className="item-modal__button">
            {isOwn && (
              <button
                className="item-modal__button-delete"
                onClick={() => {
                  setIsConfirmDeleteOpen(true);
                }}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </Modal>
      {isConfirmDeleteOpen && (
        <ConfirmDeleteModal
          item={item}
          onDeleteCard={(item) => {
            onDeleteCard(item);
            setIsConfirmDeleteOpen(false);
          }}
          onClose={() => setIsConfirmDeleteOpen(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ItemModal;
