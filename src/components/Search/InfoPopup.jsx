import Popup from "../Popup/Popup.jsx";

function InfoPopup({ isOpen, title, message, onClose }) {
  return (
    <Popup isOpen={isOpen} title={title} onClose={onClose}>
      <p className="search__popup-message">{message}</p>

      <button className="search__button" type="button" onClick={onClose}>
        OK
      </button>
    </Popup>
  );
}

export default InfoPopup;
