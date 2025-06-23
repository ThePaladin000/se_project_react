import { useEffect } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";

function ItemModal({ item, onClose }) {
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
        <img src={item.link} alt={item.name} className="item-modal__image" />
        <div className="item-modal__caption">
          <p className="item-modal__caption-name">{item.name}</p>
          <p className="item-modal__caption-weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
