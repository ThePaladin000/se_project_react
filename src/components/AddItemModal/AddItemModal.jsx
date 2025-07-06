import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GarmentChildren from "../Forms/GarmentChildren";

export default function AddItemModal({ isOpen, onClose, onAddGarment }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
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
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        weather={weather}
        setWeather={setWeather}
      />
    </ModalWithForm>
  );
}
