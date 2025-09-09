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
  const {
    values,
    errors,
    focused,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isValid,
  } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddGarment({
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weather,
      });
      onClose();
    }
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
      isValid={isValid}
    >
      <GarmentChildren
        name={values.name}
        imageUrl={values.imageUrl}
        weather={values.weather}
        errors={errors}
        focused={focused}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </ModalWithForm>
  );
}
