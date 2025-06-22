import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ temp }) {
  return (
    <main className="main">
      <WeatherCard temp={temp} />
      <ItemCard />
    </main>
  );
}

export default Main;
