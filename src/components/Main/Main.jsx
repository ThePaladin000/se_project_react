import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ items, weather, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      {items.map((item) => (
        <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
      ))}
    </main>
  );
}

export default Main;
