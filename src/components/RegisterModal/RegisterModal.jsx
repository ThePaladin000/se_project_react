import { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal__visible">
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="modal__title">Sign up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="modal__input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal__input-group">
            <input
              type="url"
              name="avatar"
              placeholder="Avatar URL"
              className="modal__input"
              value={formData.avatar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal__input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="modal__input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal__input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="modal__input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="modal__submit-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
