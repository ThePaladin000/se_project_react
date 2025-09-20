import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext, useMemo } from "react";

function Main({ items, weather, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("Main component - items:", items);
  console.log("Main component - weather:", weather);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.weather || !weather.heatLevel) {
        console.log("Filtering out item due to missing weather data:", item);
        return false;
      }
      const matches =
        item.weather.toLowerCase() === weather.heatLevel.toLowerCase();
      console.log(
        `Item ${item.name} (${item.weather}) matches weather ${weather.heatLevel}:`,
        matches
      );
      return matches;
    });
  }, [items, weather.heatLevel]);

  console.log("Filtered items:", filteredItems);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <p className="main__item-cards-title">
        Today is {weather.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
        . You may want to wear:
      </p>
      <div className="main__item-cards">
        {filteredItems.map((item) => (
          <ItemCard
            item={item}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
