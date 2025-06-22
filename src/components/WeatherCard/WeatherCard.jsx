import "./WeatherCard.css";
import { defaultClothingItems } from "../../utils/constants";

function WeatherCard({ temp }) {
  const renderCard = (item) => {
    return (
      <div className="item__card" key={item._id}>
        <p className="item__card-text">{item.name}</p>
        <img src={item.link} alt={item.name} className="item__card-image" />
      </div>
    );
  };
  return (
    <section className="weather">
      <p className="weather__temperature">
        Today Is {temp}°F / You may want to wear:
      </p>
      <div className="item__card-container">
        {defaultClothingItems.map((item) => renderCard(item))}
      </div>
    </section>
  );
}

export default WeatherCard;
