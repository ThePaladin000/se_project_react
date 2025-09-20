import { useEffect, useRef } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import GarmentChildren from "../Forms/GarmentChildren";
import { useForm } from "../../hooks/useForm";

const initialValues = {
  name: "",
  imageUrl: "",
  weather: "hot",
};

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
  } = useForm(initialValues);

  const prevIsOpenRef = useRef(false);

  useEffect(() => {
    // Only reset form when modal opens (transitions from false to true)
    if (isOpen && !prevIsOpenRef.current) {
      resetForm();
    }
    prevIsOpenRef.current = isOpen;
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
