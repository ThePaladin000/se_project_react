import "./WeatherCard.css";
import weatherImages from "../../utils/weatherImages";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherImage = weatherImages.find((image) => {
    return (
      image.condition === weather.weather &&
      image.timeOfDay === weather.timeOfDay
    );
  });

  const imageUrl = weatherImage?.url || "";

  if (!weather.temp) {
    return null;
  }

  return (
    <section className="weather">
      <p className="weather__temperature">
        {currentTemperatureUnit === "F" ? weather.temp.F : weather.temp.C}°
        {currentTemperatureUnit}
      </p>
      <img className="weather__image" src={imageUrl} alt={weather.weather} />
    </section>
  );
}

export default WeatherCard;
