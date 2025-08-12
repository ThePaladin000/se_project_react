import { useEffect, useState, useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ item, onClose, onDeleteCard }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const isOwn = item?.owner === currentUser?._id;

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("keydown", escListener);
    };
  }, [onClose]);

  return (
    <div className="item-modal" onClick={onClose}>
      <div
        className="item-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="item-modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-modal__image"
        />
        <div className="item-modal__content">
          <div className="item-modal__caption">
            <p className="item-modal__caption-name">{item.name}</p>
            <p className="item-modal__caption-weather">
              Weather: {item.weather}
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
      {isConfirmDeleteOpen && (
        <ConfirmDeleteModal
          item={item}
          onDeleteCard={(item) => {
            onDeleteCard(item);
            setIsConfirmDeleteOpen(false);
          }}
          onClose={() => setIsConfirmDeleteOpen(false)}
        />
      )}
    </div>
  );
}

export default ItemModal;
