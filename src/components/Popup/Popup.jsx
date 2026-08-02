function Popup({ isOpen, title, children, onClose }) {
  return (
    <div className={`popup${isOpen ? " popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Fechar popup"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Popup;
