import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GarmentChildren from "../Forms/GarmentChildren";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({ isOpen, onClose, onAddGarment }) {
  const { values, handleChange, setValues } = useForm({ name: "" });

  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  useEffect(() => {
    setValues({ name: "" });
    setImageUrl("");
    setWeather("hot");
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment({ name: values.name, imageUrl, weather });
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
        name={values.name}
        setName={handleChange}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        weather={weather}
        setWeather={setWeather}
      />
    </ModalWithForm>
  );
}
