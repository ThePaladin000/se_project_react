import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: "", avatar: "" });

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
    onUpdateProfile({ name: values.name, avatar: values.avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          placeholder="Your name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
          required
        />
      </label>
    </ModalWithForm>
  );
}
