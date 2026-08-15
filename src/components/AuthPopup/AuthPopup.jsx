import { useState } from "react";

import Popup from "../Popup/Popup.jsx";

function AuthPopup({ isOpen, title, submitText, mode, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name,
      email,
      password,
    });
  }

  return (
    <Popup isOpen={isOpen} title={title} onClose={onClose}>
      <form className="auth-popup__form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
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
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </>
        )}

        <label className="auth-popup__label" htmlFor={`${mode}-email`}>
          Email
        </label>
        <input
          className="auth-popup__input"
          id={`${mode}-email`}
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label className="auth-popup__label" htmlFor={`${mode}-password`}>
          Senha
        </label>
        <input
          className="auth-popup__input"
          id={`${mode}-password`}
          name="password"
          type="password"
          minLength="6"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="auth-popup__submit" type="submit">
          {submitText}
        </button>
      </form>
    </Popup>
  );
}

export default AuthPopup;
