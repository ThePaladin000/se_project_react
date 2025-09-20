import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const initialValues = { name: "", avatar: "" };

export default function EditProfileModal({
  isOpen,
  onClose,
  onUpdateProfile,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    focused,
    handleChange,
    handleBlur,
    setValues,
    validateForm,
    isValid,
  } = useForm(initialValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateProfile({ name: values.name, avatar: values.avatar });
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input ${
            errors.name && focused.name ? "modal__input--error" : ""
          }`}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
          minLength="2"
          maxLength="30"
          required
        />
        {errors.name && focused.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            errors.avatar && focused.avatar ? "modal__input--error" : ""
          }`}
          value={values.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/avatar.jpg"
          required
        />
        {errors.avatar && focused.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
