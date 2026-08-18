import Popup from "../Popup/Popup.jsx";

function DeleteItemPopup({ isOpen, onClose, onDeleteItem }) {
  return (
    <Popup isOpen={isOpen} title="Excluir item" onClose={onClose}>
      <div className="search__popup-form">
        <p className="search__empty">
          Tem certeza que deseja excluir este item do almoxarifado?
        </p>
        <button
          className="search__button search__button_danger"
          type="button"
          onClick={onDeleteItem}
        >
          Excluir item
        </button>
      </div>
    </Popup>
  );
}

export default DeleteItemPopup;
