import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { handleCardClick, handleCloseItemModal } from "../../utils/utils";
import { getWeather } from "../../utils/weatherApi";
import { location } from "../../utils/constants";
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddGarment = (item) => {
    const token = localStorage.getItem("jwt");
    postItem(item, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    deleteItem(card._id, token)
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

  const handleRegister = (formData) => {
    signup(formData)
      .then(() => {
        return signin({ email: formData.email, password: formData.password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setIsRegisterModalOpen(false);
        return Promise.all([checkToken(res.token), getItems(res.token)]);
      })
      .then(([userData, items]) => {
        setCurrentUser(userData);
        setClothingItems(items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (formData) => {
    signin(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        return Promise.all([checkToken(res.token), getItems(res.token)]);
      })
      .then(([userData, items]) => {
        setCurrentUser(userData);
        setClothingItems(items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setClothingItems([]);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
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

    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      getItems(token)
        .then((items) => {
          setClothingItems(items);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [weather, isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Promise.all([checkToken(token), getItems(token)])
        .then(([userData, items]) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          setClothingItems(items);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
          setClothingItems([]);
        });
    }
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitch }}
        >
          <div className="page">
            <Header
              city={weatherIsLoading ? placeholderWeather.city : weather.city}
              onAddGarmentClick={() => setIsOpen(true)}
              isLoggedIn={isLoggedIn}
              onRegisterClick={() => {
                setIsRegisterModalOpen(true);
              }}
              onLoginClick={() => {
                setIsLoginModalOpen(true);
              }}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    items={clothingItems}
                    weather={weatherIsLoading ? placeholderWeather : weather}
                    onCardClick={(card) =>
                      handleCardClick(card, setSelectedCard)
                    }
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onAddGarmentClick={() => setIsOpen(true)}
                      items={clothingItems}
                      onCardClick={(card) =>
                        handleCardClick(card, setSelectedCard)
                      }
                      onCardLike={handleCardLike}
                      onLogout={handleLogout}
                      onEditProfile={() => setIsEditProfileOpen(true)}
                    />
                  </ProtectedRoute>
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
            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={() => {
                setIsRegisterModalOpen(false);
              }}
              onRegister={handleRegister}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => {
                setIsLoginModalOpen(false);
              }}
              onLogin={handleLogin}
            />
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setIsEditProfileOpen(false)}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
