import Popup from "../Popup/Popup.jsx";

function AddItemPopup({ isOpen, onClose, onSubmit }) {
  return (
    <Popup isOpen={isOpen} title="Adicionar ao almoxarifado" onClose={onClose}>
      <form className="search__popup-form" onSubmit={onSubmit}>
        <label className="search__label" htmlFor="item-location">
          Localizacao
        </label>
        <input
          className="search__input"
          id="item-location"
          name="location"
          type="text"
          placeholder="Ex: Gaveta A-03"
          required
        />

        <label className="search__label" htmlFor="item-quantity">
          Quantidade em estoque
        </label>
        <input
          className="search__input"
          id="item-quantity"
          name="quantity"
          type="number"
          min="0"
          defaultValue="1"
          required
        />

        <label className="search__label" htmlFor="item-minimum">
          Quantidade minima
        </label>
        <input
          className="search__input"
          id="item-minimum"
          name="minQuantity"
          type="number"
          min="0"
          defaultValue="1"
          required
        />

        <button className="search__button" type="submit">
          Salvar item
        </button>
      </form>
    </Popup>
  );
}

export default AddItemPopup;
