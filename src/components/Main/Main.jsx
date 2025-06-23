import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ items, weather, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <div className="main__item-cards">
        {items.map((item) => (
          <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
}

export default Main;
