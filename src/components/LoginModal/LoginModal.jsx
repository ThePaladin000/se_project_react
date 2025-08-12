import { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
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
    onLogin(formData);
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
        <h2 className="modal__title">Log in</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
