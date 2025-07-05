import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ city, onAddGarmentClick }) {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__info">
          <img src={logo} alt="logo" className="header__logo" />
          <p className="header__text">
            {currentDate}, {city}
          </p>
        </div>
        <div className="header__profile">
          <ToggleSwitch />
          <button className="header__profile-button">
            <p
              className="header__profile-button-text"
              onClick={onAddGarmentClick}
            >
              + Add Clothes
            </p>
          </button>
          <p className="header__profile-name">John Doe</p>
          <img src={profile} alt="profile" className="header__profile-icon" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
