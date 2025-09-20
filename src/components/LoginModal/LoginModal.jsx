import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  email: "",
  password: "",
};

const LoginFormInputs = ({
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

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
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
  } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(values);
    }
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
      isValid={isValid}
    >
      <LoginFormInputs
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

export default LoginModal;
