import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="item__card" onClick={() => onCardClick(item)}>
      <p className="item__card-text">{item.name}</p>
      <img src={item.link} alt={item.name} className="item__card-image" />
    </div>
  );
}

export default ItemCard;
