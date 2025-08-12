import logo from "../../assets/logo.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  city,
  onAddGarmentClick,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__info">
          <Link to="/">
            <img src={logo} alt="logo" className="header__logo" />
          </Link>
          <p className="header__text">
            {currentDate}, {city}
          </p>
        </div>
        <div className="header__profile">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <button className="header__profile-button">
                <p
                  className="header__profile-button-text"
                  onClick={onAddGarmentClick}
                >
                  + Add Clothes
                </p>
              </button>
              <div className="header__profile-section">
                <Link to="/profile" className="header__profile-link">
                  <p className="header__profile-name">
                    {currentUser?.name || "User"}
                  </p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt="profile"
                      className="header__profile-icon"
                    />
                  ) : (
                    <div className="header__profile-placeholder">
                      {currentUser?.name
                        ? currentUser.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </Link>
              </div>
            </>
          ) : (
            <div className="header__auth-buttons">
              <button className="header__auth-button" onClick={onRegisterClick}>
                Sign Up
              </button>
              <button className="header__auth-button" onClick={onLoginClick}>
                Log In
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
