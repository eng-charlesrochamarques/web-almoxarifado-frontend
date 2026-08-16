import { useState } from "react";

import Popup from "../Popup/Popup.jsx";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function AuthPopup({
  isOpen,
  title,
  submitText,
  mode,
  serverError,
  successMessage,
  onClose,
  onSubmit,
  onSwitchMode,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage, form } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationMessage,
    }));

    setIsValid(form.checkValidity());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setIsValid(false);
      return;
    }

    onSubmit(values);
  }

  const isRegisterMode = mode === "register";
  const switchText = isRegisterMode ? "Entrar" : "Registrar";
  const switchLabel = isRegisterMode
    ? "Ja tem uma conta?"
    : "Ainda nao tem uma conta?";

  return (
    <Popup isOpen={isOpen} title={title} onClose={onClose}>
      <form className="auth-popup__form" onSubmit={handleSubmit} noValidate>
        {isRegisterMode && (
          <div className="auth-popup__field">
            <label className="auth-popup__label" htmlFor={`${mode}-name`}>
              Nome
            </label>
            <input
              className="auth-popup__input"
              id={`${mode}-name`}
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              value={values.name}
              onChange={handleChange}
              required
            />
            <span className="auth-popup__error">{errors.name}</span>
          </div>
        )}

        <div className="auth-popup__field">
          <label className="auth-popup__label" htmlFor={`${mode}-email`}>
            Email
          </label>
          <input
            className="auth-popup__input"
            id={`${mode}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="auth-popup__error">{errors.email}</span>
        </div>

        <div className="auth-popup__field">
          <label className="auth-popup__label" htmlFor={`${mode}-password`}>
            Senha
          </label>
          <input
            className="auth-popup__input"
            id={`${mode}-password`}
            name="password"
            type="password"
            minLength="6"
            value={values.password}
            onChange={handleChange}
            required
          />
          <span className="auth-popup__error">{errors.password}</span>
        </div>

        {successMessage && (
          <p className="auth-popup__message auth-popup__message_success">
            {successMessage}
          </p>
        )}

        {serverError && (
          <p className="auth-popup__message auth-popup__message_error">
            {serverError}
          </p>
        )}

        <button
          className="auth-popup__submit"
          type="submit"
          disabled={!isValid}
        >
          {submitText}
        </button>

        <p className="auth-popup__switch">
          {switchLabel}{" "}
          <button
            className="auth-popup__switch-button"
            type="button"
            onClick={onSwitchMode}
          >
            {switchText}
          </button>
        </p>
      </form>
    </Popup>
  );
}

export default AuthPopup;
