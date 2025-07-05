import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GarmentChildren from "../Forms/GarmentChildren";

export default function AddItemModal({ isOpen, onClose, onAddGarment }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment({ name, link, weather });
    setName("");
    setLink("");
    setWeather("");
    onClose();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <GarmentChildren
        name={name}
        setName={setName}
        link={link}
        setLink={setLink}
        weather={weather}
        setWeather={setWeather}
      />
    </ModalWithForm>
  );
}
