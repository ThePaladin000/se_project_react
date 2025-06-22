function WeatherCard({ temp }) {
  return (
    <section className="weather">
      <p className="weather__temperature">{temp}°F</p>
    </section>
  );
}

export default WeatherCard;
