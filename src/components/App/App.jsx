import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { handleCardClick, handleCloseItemModal } from "../../utils/utils";
import { getWeather } from "../../utils/weatherApi";
import { location } from "../../utils/constants";
import { getItems, postItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";

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
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddGarment = (item) => {
    postItem(item)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
    setSelectedCard(null);
  };

  useEffect((weather) => {
    if (Object.keys(weather).length === 0) {
      getWeather(location)
        .then((weather) => {
          setWeather(weather);
          setWeatherIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getItems()
      .then((items) => {
        setClothingItems(items);
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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                items={clothingItems}
                weather={weatherIsLoading ? placeholderWeather : weather}
                onCardClick={(card) => handleCardClick(card, setSelectedCard)}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                onAddGarmentClick={() => setIsOpen(true)}
                items={clothingItems}
                onCardClick={(card) => handleCardClick(card, setSelectedCard)}
              />
            }
          />
        </Routes>
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
            onDeleteCard={handleDeleteCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
