import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  onAddGarmentClick,
  items,
  onCardClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-title">Your Items</p>
        <p
          className="clothes-section__header-button"
          onClick={onAddGarmentClick}
        >
          +Add new
        </p>
      </div>
      <div className="main__item-cards">
        {items.map((item) => (
          <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
