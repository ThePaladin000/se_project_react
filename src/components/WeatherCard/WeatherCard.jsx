import "./WeatherCard.css";

function WeatherCard({ weather }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{weather.temp}°F</p>
    </section>
  );
}

export default WeatherCard;
