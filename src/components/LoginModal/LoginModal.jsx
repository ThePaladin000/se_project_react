import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginFormInputs = ({ values, handleChange }) => {
  return (
    <>
      <div className="modal__input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
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
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin, isLoading, onToggleModal }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      secondBtnText="or Sign Up"
      onSecondBtnClick={onToggleModal}
    >
      <LoginFormInputs values={values} handleChange={handleChange} />
    </ModalWithForm>
  );
};

export default LoginModal;
