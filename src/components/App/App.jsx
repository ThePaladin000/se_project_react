import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { handleCardClick, handleCloseItemModal } from "../../utils/utils";
import { defaultClothingItems, location } from "../../utils/constants";
import { getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { v4 } from "uuid";

const placeholderWeather = {
  temp: { F: "--", C: "--" },
  heatLevel: "",
  weather: "",
  timeOfDay: "",
  city: "Loading...",
};

function App() {
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [weather, setWeather] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isOpen, setIsOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddGarment = (item) => {
    setClothingItems((prev) => [...prev, { ...item, _id: v4() }]);
    setIsOpen(false);
  };

  useEffect(() => {
    getWeather(location)
      .then((weather) => {
        setWeather(weather);
        setWeatherIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitch }}
      >
        <Header
          city={weatherIsLoading ? placeholderWeather.city : weather.city}
          onAddGarmentClick={() => setIsOpen(true)}
        />
        <Main
          items={clothingItems}
          weather={weatherIsLoading ? placeholderWeather : weather}
          onCardClick={(card) => handleCardClick(card, setSelectedCard)}
        />
        <Footer />
        <AddItemModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onAddGarment={handleAddGarment}
        />
        {selectedCard && (
          <ItemModal
            item={selectedCard}
            onClose={() => handleCloseItemModal(setSelectedCard)}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
