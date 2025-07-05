import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ items, weather, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <p className="main__item-cards-title">
        Today is {weather.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
        . You may want to wear:
      </p>
      <div className="main__item-cards">
        {items.map((item) => (
          <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
}

export default Main;
