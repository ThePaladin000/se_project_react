import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { GarmentChildren } from "../Forms/GarmentChildren";
import { handleCardClick, handleCloseItemModal } from "../../utils/utils";
import { defaultClothingItems, location } from "../../utils/constants";
import { getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [weather, setWeather] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeather(location)
      .then((weather) => {
        setWeather(weather);
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
        <Header />
        <Main
          items={defaultClothingItems}
          weather={weather}
          onCardClick={(card) => handleCardClick(card, setSelectedCard)}
        />
        <Footer />
        <ModalWithForm
          title="New garment"
          name="garment"
          buttonText="Add garment"
        >
          {GarmentChildren}
        </ModalWithForm>
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
