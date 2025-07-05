import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import "./Header.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { GarmentChildren } from "../Forms/GarmentChildren";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

// TODO: get city from API
const city = "New York";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
          <button className="header__profile-button" onClick={handleOpenModal}>
            <p className="header__profile-button-text">+ Add Clothes</p>
          </button>
          <p className="header__profile-name">John Doe</p>
          <img src={profile} alt="profile" className="header__profile-icon" />
        </div>
      </nav>
      <ModalWithForm
        title="Add Clothes"
        name="add-clothes"
        buttonText="Add"
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      >
        {GarmentChildren}
      </ModalWithForm>
    </header>
  );
}

export default Header;
