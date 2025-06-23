import "./WeatherCard.css";
import weatherImages from "../../utils/weatherImages";

function WeatherCard({ weather }) {
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
      <p className="weather__temperature">{weather.temp}°F</p>
      <img className="weather__image" src={imageUrl} alt={weather.weather} />
    </section>
  );
}

export default WeatherCard;
