import { useState, useContext, useEffect } from "react";
import "./ItemModal.css";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeIcon from "../../assets/close.svg";

function ItemModal({ item, onClose, onDeleteCard, isLoading }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const isOwn = item?.owner === currentUser?._id;

  useEffect(() => {
    if (!item) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [item, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!item) return null;

  return (
    <>
      <div
        className="item-modal"
        onMouseDown={handleOverlay}
        role="dialog"
        aria-modal="true"
      >
        <div className="item-modal__container">
          <button className="item-modal__close" type="button" onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
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
        </div>
      </div>
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
