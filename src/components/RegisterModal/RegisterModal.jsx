import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterFormInputs = ({ values, handleChange }) => {
  return (
    <>
      <div className="modal__input-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="modal__input"
          value={values.name}
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
          value={values.avatar}
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

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  onToggleModal,
}) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      secondBtnText="or Log In"
      onSecondBtnClick={onToggleModal}
    >
      <RegisterFormInputs values={values} handleChange={handleChange} />
    </ModalWithForm>
  );
};

export default RegisterModal;
