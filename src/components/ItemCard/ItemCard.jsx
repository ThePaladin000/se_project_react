import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <section className="item-cards">
      <div className="item__cards-container">
        <div className="item__card" key={item._id}>
          <p className="item__card-text">{item.name}</p>
          <img src={item.link} alt={item.name} className="item__card-image" />
        </div>
      </div>
    </section>
  );
}

export default ItemCard;
