import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GarmentChildren from "../Forms/GarmentChildren";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddGarment,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  useEffect(() => {
    setValues({ name: "", imageUrl: "", weather: "hot" });
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
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
      isLoading={isLoading}
    >
      <GarmentChildren
        name={values.name}
        imageUrl={values.imageUrl}
        weather={values.weather}
        handleChange={handleChange}
      />
    </ModalWithForm>
  );
}
