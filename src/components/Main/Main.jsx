import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ temp }) {
  return (
    <main className="main">
      <WeatherCard temp={temp} />
      {defaultClothingItems.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </main>
  );
}

export default Main;
