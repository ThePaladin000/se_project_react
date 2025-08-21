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
  const [weather, setWeather] = useState(placeholderWeather);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isOpen, setIsOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleToggleAuthModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddGarment = (item) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return postItem(item, token).then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteCard = (card) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return deleteItem(card._id, token).then(() => {
        setSelectedCard(null);
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id)
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegister = (formData) => {
    const makeRequest = () => {
      return signup(formData)
        .then(() => {
          return signin({ email: formData.email, password: formData.password });
        })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return Promise.all([checkToken(res.token), getItems(res.token)]);
        })
        .then(([userData, items]) => {
          setCurrentUser(userData);
          setClothingItems(items);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = (formData) => {
    const makeRequest = () => {
      return signin(formData)
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return Promise.all([checkToken(res.token), getItems(res.token)]);
        })
        .then(([userData, items]) => {
          setCurrentUser(userData);
          setClothingItems(items);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setClothingItems([]);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      if (!token) return Promise.reject(new Error("No token found"));
      return updateProfile({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
    };
    handleSubmit(makeRequest);
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
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      console.log(
        "Fetching items for logged in user, token:",
        token ? "present" : "missing"
      );
      getItems(token)
        .then((items) => {
          console.log("Successfully fetched items:", items);
          setClothingItems(items);
        })
        .catch((err) => {
          console.error("Error fetching items:", err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getWeather(location)
      .then((weather) => {
        setWeather(weather);
        setWeatherIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setWeatherIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("Initial token check, token:", token ? "present" : "missing");
    if (token) {
      console.log("Checking token and fetching items...");
      Promise.all([checkToken(token), getItems(token)])
        .then(([userData, items]) => {
          console.log("Token check successful, userData:", userData);
          console.log("Initial items fetch successful:", items);
          setCurrentUser(userData);
          setIsLoggedIn(true);
          setClothingItems(items);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
          setClothingItems([]);
        });
    } else {
      console.log("No token found, user not logged in");
    }
  }, []);

  return (
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
                  onCardClick={(card) => handleCardClick(card, setSelectedCard)}
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
            isLoading={isLoading}
          />
          {selectedCard && (
            <ItemModal
              item={selectedCard}
              onClose={() => handleCloseItemModal(setSelectedCard)}
              onDeleteCard={handleDeleteCard}
              isLoading={isLoading}
            />
          )}
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => {
              setIsRegisterModalOpen(false);
            }}
            onRegister={handleRegister}
            isLoading={isLoading}
            onToggleModal={handleToggleAuthModal}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => {
              setIsLoginModalOpen(false);
            }}
            onLogin={handleLogin}
            isLoading={isLoading}
            onToggleModal={handleToggleAuthModal}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
