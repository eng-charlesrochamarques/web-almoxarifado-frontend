import Popup from "../Popup/Popup.jsx";

function EditItemPopup({ isOpen, item, onClose, onSubmit }) {
  return (
    <Popup isOpen={isOpen} title="Editar item" onClose={onClose}>
      {item && (
        <form className="search__popup-form" onSubmit={onSubmit}>
          <label className="search__label" htmlFor="edit-location">
            Localizacao
          </label>
          <input
            className="search__input"
            id="edit-location"
            name="location"
            type="text"
            defaultValue={item.location}
            required
          />

          <label className="search__label" htmlFor="edit-quantity">
            Quantidade em estoque
          </label>
          <input
            className="search__input"
            id="edit-quantity"
            name="quantity"
            type="number"
            min="0"
            defaultValue={item.quantity}
            required
          />

          <label className="search__label" htmlFor="edit-minimum">
            Quantidade minima
          </label>
          <input
            className="search__input"
            id="edit-minimum"
            name="minQuantity"
            type="number"
            min="0"
            defaultValue={item.minQuantity}
            required
          />

          <label className="search__label" htmlFor="edit-price">
            Ultimo preco
          </label>
          <input
            className="search__input"
            id="edit-price"
            name="lastPrice"
            type="number"
            min="0"
            step="0.0001"
            defaultValue={item.lastPrice}
            required
          />

          <label className="search__label" htmlFor="edit-image-url">
            URL da imagem
          </label>
          <input
            className="search__input"
            id="edit-image-url"
            name="imageUrl"
            type="url"
            placeholder="https://..."
            defaultValue={item.imageUrl}
          />

          <button className="search__button" type="submit">
            Salvar alteracoes
          </button>
        </form>
      )}
    </Popup>
  );
}

export default EditItemPopup;
