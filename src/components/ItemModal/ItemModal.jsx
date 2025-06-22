import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  return (
    <div className="item-modal">
      <div className="item-modal__container">
        <button className="item-modal__close" onClick={onClose}></button>
        <img src={item.link} alt={item.name} className="item-modal__image" />
        <div className="item-modal__caption">
          <p>{item.name}</p>
          <p>Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
