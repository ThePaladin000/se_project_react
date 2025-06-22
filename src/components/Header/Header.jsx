import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

// TODO: get city from API
const city = "New York";

function Header() {
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
          <button className="header__profile-button">
            <p className="header__profile-button-text">+ Add Clothes</p>
          </button>
          <p className="header__profile-name">John Doe</p>
          <img src={profile} alt="profile" className="header__profile-icon" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
