import { useEffect, useState } from "react";
import Popup from "../Popup/Popup.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import {
  createItem,
  deleteItem,
  getItems,
  searchTmeItems,
  updateItem,
} from "../../utils/api.js";

const INITIAL_VISIBLE_RESULTS = 3;
const RESULTS_STEP = 3;
const STORAGE_KEYS = {
  searchQuery: "webAlmoxarifadoSearchQuery",
  distributorResults: "webAlmoxarifadoDistributorResults",
  hasSearchedDistributor: "webAlmoxarifadoHasSearchedDistributor",
};
function Search({ token }) {
  const [stockItems, setStockItems] = useState([]);

  const [stockError, setStockError] = useState("");
  const [selectedDistributorItem, setSelectedDistributorItem] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.searchQuery) || "";
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    getItems(token)
      .then((items) => {
        setStockItems(items);
        setStockError("");
      })
      .catch(() => {
        setStockError("Nao foi possivel carregar os itens do almoxarifado.");
      });
  }, [token]);

  const [hasSearchedDistributor, setHasSearchedDistributor] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.hasSearchedDistributor) === "true";
  });
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [distributorResults, setDistributorResults] = useState(() => {
    const savedResults = localStorage.getItem(STORAGE_KEYS.distributorResults);

    if (!savedResults) return [];

    try {
      return JSON.parse(savedResults);
    } catch {
      return [];
    }
  });
  const [isLoadingDistributor, setIsLoadingDistributor] = useState(false);
  const [distributorError, setDistributorError] = useState("");
  const [visibleDistributorCount, setVisibleDistributorCount] = useState(
    INITIAL_VISIBLE_RESULTS,
  );
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleStockItems = stockItems.filter((item) => {
    if (!normalizedQuery) return true;

    return [
      item.name,
      item.manufacturer,
      item.partNumber,
      item.category,
      item.location,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
  });

  const hasVisibleStockItems = visibleStockItems.length > 0;
  const hasDistributorResults = distributorResults.length > 0;
  const visibleDistributorResults = distributorResults.slice(
    0,
    visibleDistributorCount,
  );
  const shouldShowMoreButton =
    visibleDistributorCount < distributorResults.length;
  const canSearchDistributor =
    Boolean(normalizedQuery) && !hasVisibleStockItems;
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.searchQuery, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.hasSearchedDistributor,
      String(hasSearchedDistributor),
    );
  }, [hasSearchedDistributor]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.distributorResults,
      JSON.stringify(distributorResults),
    );
  }, [distributorResults]);
  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
    setHasSearchedDistributor(false);
    setDistributorResults([]);
    setDistributorError("");
    setVisibleDistributorCount(INITIAL_VISIBLE_RESULTS);
  }

  function handleSearchDistributor() {
    setHasSearchedDistributor(true);
    setIsLoadingDistributor(true);
    setDistributorError("");
    setVisibleDistributorCount(INITIAL_VISIBLE_RESULTS);
    searchTmeItems(token, searchQuery)
      .then((items) => {
        setDistributorResults(items);
      })
      .catch(() => {
        setDistributorError(
          "Desculpe, algo deu errado durante a solicitacao. Pode haver um problema de conexao ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.",
        );
      })
      .finally(() => {
        setIsLoadingDistributor(false);
      });
  }
  function handleShowMoreDistributorResults() {
    setVisibleDistributorCount((currentCount) => currentCount + RESULTS_STEP);
  }
  function handleOpenAddPopup(item) {
    setSelectedDistributorItem(item);
    setIsAddPopupOpen(true);
  }

  function handleClosePopup() {
    setIsAddPopupOpen(false);
    setSelectedDistributorItem(null);
  }

  function handleAddItemSubmit(event) {
    event.preventDefault();

    if (!selectedDistributorItem) {
      return;
    }

    const formData = new FormData(event.target);

    createItem(token, {
      name:
        selectedDistributorItem.description ||
        selectedDistributorItem.manufacturerPartNumber,
      category: "Componentes eletronicos",
      partNumber: selectedDistributorItem.manufacturerPartNumber,
      manufacturer: selectedDistributorItem.manufacturer,
      location: formData.get("location"),
      quantity: Number(formData.get("quantity")),
      minQuantity: Number(formData.get("minQuantity")),
      lastPrice: Number(selectedDistributorItem.unitPrice) || 0,
      currency: selectedDistributorItem.currency || "EUR",
      imageUrl: selectedDistributorItem.imageUrl || "",
    })
      .then((newItem) => {
        setStockItems((currentItems) => [newItem, ...currentItems]);
        handleClosePopup();
        setSearchQuery("");
        setDistributorResults([]);
        setHasSearchedDistributor(false);
      })
      .catch(() => {
        setDistributorError(
          "Nao foi possivel adicionar o item ao almoxarifado.",
        );
      });
  }

  function handleOpenDeletePopup(item) {
    setSelectedStockItem(item);
    setIsDeletePopupOpen(true);
  }

  function handleCloseDeletePopup() {
    setSelectedStockItem(null);
    setIsDeletePopupOpen(false);
  }

  function handleDeleteItem() {
    if (!selectedStockItem) {
      return;
    }

    deleteItem(token, selectedStockItem._id)
      .then(() => {
        setStockItems((currentItems) =>
          currentItems.filter((item) => item._id !== selectedStockItem._id),
        );
        handleCloseDeletePopup();
      })
      .catch(() => {
        setStockError("Nao foi possivel excluir o item.");
      });
  }

  function handleOpenEditPopup(item) {
    setItemToEdit(item);
    setIsEditPopupOpen(true);
  }

  function handleCloseEditPopup() {
    setItemToEdit(null);
    setIsEditPopupOpen(false);
  }

  function handleEditItemSubmit(event) {
    event.preventDefault();

    if (!itemToEdit) {
      return;
    }

    const formData = new FormData(event.target);

    updateItem(token, itemToEdit._id, {
      location: formData.get("location"),
      quantity: Number(formData.get("quantity")),
      minQuantity: Number(formData.get("minQuantity")),
      lastPrice: Number(formData.get("lastPrice")),
      imageUrl: formData.get("imageUrl"),
    })
      .then((updatedItem) => {
        setStockItems((currentItems) =>
          currentItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
        );
        handleCloseEditPopup();
      })
      .catch(() => {
        setStockError("Nao foi possivel editar o item.");
      });
  }
  return (
    <main className="search">
      <section className="search__header">
        <p className="search__eyebrow">Pesquisa de almoxarifado</p>
        <h1 className="search__title">
          Encontre itens internos ou consulte distribuidores.
        </h1>
        <p className="search__description">
          Pesquise os itens cadastrados no almoxarifado. Se um componente ainda
          nao existir no estoque, consulte um distribuidor e adicione o
          resultado informando localizacao e quantidade.
        </p>
      </section>

      <section className="search__panel" aria-label="Pesquisa no almoxarifado">
        <div className="search__form">
          <div className="search__field">
            <label className="search__label" htmlFor="search-query">
              Item, fabricante ou part number
            </label>
            <input
              className="search__input"
              id="search-query"
              name="query"
              type="text"
              placeholder="Ex: NE555, LM358, resistor 10k"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
        </div>
      </section>

      <section className="search__section" aria-label="Itens do almoxarifado">
        <div className="search__section-header">
          <div>
            <p className="search__section-eyebrow">Resultado interno</p>
            <h2 className="search__section-title">Itens no almoxarifado</h2>
          </div>
          <p className="search__results-count">
            {visibleStockItems.length}{" "}
            {visibleStockItems.length === 1
              ? "item encontrado"
              : "itens encontrados"}
          </p>
        </div>

        {stockError && (
          <p className="search__empty search__empty_error">{stockError}</p>
        )}
        {!stockError && hasVisibleStockItems ? (
          <div className="search__table-wrapper">
            <table className="search__table">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Item</th>
                  <th>Part number</th>
                  <th>Fabricante</th>
                  <th>Localizacao</th>
                  <th>Qtd.</th>
                  <th>Min.</th>
                  <th>Ultimo preco</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {visibleStockItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.imageUrl ? (
                        <img
                          className="search__item-image"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                      ) : (
                        <div className="search__image-placeholder">CI</div>
                      )}
                    </td>
                    <td>
                      <span className="search__item-name">{item.name}</span>
                      <span className="search__item-category">
                        {item.category}
                      </span>
                    </td>
                    <td>{item.partNumber}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.location}</td>
                    <td>{item.quantity}</td>
                    <td>{item.minQuantity}</td>
                    <td>
                      {item.currency} {Number(item.lastPrice).toFixed(2)}
                    </td>
                    <td>
                      <div className="search__actions">
                        <button
                          className="search__icon-button"
                          type="button"
                          aria-label="Atualizar preco"
                          title="Atualizar preco"
                        >
                          R
                        </button>
                        <button
                          className="search__icon-button search__icon-button_secondary"
                          type="button"
                          aria-label="Editar item"
                          title="Editar item"
                          onClick={() => handleOpenEditPopup(item)}
                        >
                          E
                        </button>
                        <button
                          className="search__icon-button search__icon-button_danger"
                          type="button"
                          aria-label="Excluir item"
                          title="Excluir item"
                          onClick={() => handleOpenDeletePopup(item)}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="search__empty">
            Nenhum item encontrado no almoxarifado.
          </p>
        )}
      </section>

      {canSearchDistributor && (
        <section className="search__section" aria-label="Busca em distribuidor">
          <div className="search__section-header">
            <div>
              <p className="search__section-eyebrow">Resultado externo</p>
              <h2 className="search__section-title">Distribuidor</h2>
            </div>
            <button
              className="search__button search__button_secondary"
              type="button"
              onClick={handleSearchDistributor}
            >
              Buscar em distribuidor
            </button>
          </div>

          {!hasSearchedDistributor && (
            <p className="search__empty">
              O item pesquisado nao esta cadastrado. Consulte o distribuidor
              para adicionar um novo item ao almoxarifado.
            </p>
          )}

          {isLoadingDistributor && <Preloader />}

          {distributorError && (
            <p className="search__empty search__empty_error">
              {distributorError}
            </p>
          )}
          {hasSearchedDistributor &&
            !isLoadingDistributor &&
            !distributorError &&
            hasDistributorResults && (
              <>
                <div className="search__table-wrapper">
                  <table className="search__table">
                    <thead>
                      <tr>
                        <th>Imagem</th>
                        <th>Fornecedor</th>
                        <th>Part number</th>
                        <th>Fabricante</th>
                        <th>Descricao</th>
                        <th>Disponivel</th>
                        <th>Preco</th>
                        <th>Acao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleDistributorResults.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="search__image-placeholder">CI</div>
                          </td>
                          <td>{item.supplier}</td>
                          <td>{item.manufacturerPartNumber}</td>
                          <td>{item.manufacturer}</td>
                          <td>{item.description}</td>
                          <td>{item.availability}</td>
                          <td>
                            {item.currency} {item.unitPrice.toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="search__icon-button"
                              type="button"
                              aria-label="Adicionar ao almoxarifado"
                              title="Adicionar ao almoxarifado"
                              onClick={() => handleOpenAddPopup(item)}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {shouldShowMoreButton && (
                  <button
                    className="search__show-more"
                    type="button"
                    onClick={handleShowMoreDistributorResults}
                  >
                    Mostrar mais
                  </button>
                )}
              </>
            )}

          {hasSearchedDistributor &&
            !isLoadingDistributor &&
            !distributorError &&
            !hasDistributorResults && (
              <p className="search__empty">
                Nenhum resultado encontrado no distribuidor.
              </p>
            )}
        </section>
      )}

      <Popup
        isOpen={isAddPopupOpen}
        title="Adicionar ao almoxarifado"
        onClose={handleClosePopup}
      >
        <form className="search__popup-form" onSubmit={handleAddItemSubmit}>
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

      <Popup
        isOpen={isDeletePopupOpen}
        title="Excluir item"
        onClose={handleCloseDeletePopup}
      >
        <div className="search__popup-form">
          <p className="search__empty">
            Tem certeza que deseja excluir este item do almoxarifado?
          </p>
          <button
            className="search__button search__button_danger"
            type="button"
            onClick={handleDeleteItem}
          >
            Excluir item
          </button>
        </div>
      </Popup>

      <Popup
        isOpen={isEditPopupOpen}
        title="Editar item"
        onClose={handleCloseEditPopup}
      >
        {itemToEdit && (
          <form className="search__popup-form" onSubmit={handleEditItemSubmit}>
            <label className="search__label" htmlFor="edit-location">
              Localizacao
            </label>
            <input
              className="search__input"
              id="edit-location"
              name="location"
              type="text"
              defaultValue={itemToEdit.location}
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
              defaultValue={itemToEdit.quantity}
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
              defaultValue={itemToEdit.minQuantity}
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
              defaultValue={itemToEdit.lastPrice}
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
              defaultValue={itemToEdit.imageUrl}
            />

            <button className="search__button" type="submit">
              Salvar alteracoes
            </button>
          </form>
        )}
      </Popup>
    </main>
  );
}

export default Search;
