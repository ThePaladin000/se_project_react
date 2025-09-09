import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterFormInputs = ({
  values,
  errors,
  focused,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      <div className="modal__input-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`modal__input ${
            errors.name && focused.name ? "modal__input--error" : ""
          }`}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.name && focused.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </div>
      <div className="modal__input-group">
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          className={`modal__input ${
            errors.avatar && focused.avatar ? "modal__input--error" : ""
          }`}
          value={values.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.avatar && focused.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </div>
      <div className="modal__input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`modal__input ${
            errors.email && focused.email ? "modal__input--error" : ""
          }`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.email && focused.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </div>
      <div className="modal__input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`modal__input ${
            errors.password && focused.password ? "modal__input--error" : ""
          }`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.password && focused.password && (
          <span className="modal__error">{errors.password}</span>
        )}
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
  error,
}) => {
  const {
    values,
    errors,
    focused,
    handleChange,
    handleBlur,
    validateForm,
    isValid,
  } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(values);
    }
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
      isValid={isValid}
    >
      <RegisterFormInputs
        values={values}
        errors={errors}
        focused={focused}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      {error && (
        <div className="modal__error-container">
          <span className="modal__error modal__error--server">{error}</span>
        </div>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;
