import { useEffect, useState } from "react";

import Preloader from "../Preloader/Preloader.jsx";
import {
  createItem,
  deleteItem,
  getItems,
  searchTmeItems,
  updateItem,
} from "../../utils/api.js";
import SearchForm from "./SearchForm.jsx";
import StockTable from "./StockTable.jsx";
import SupplierTable from "./SupplierTable.jsx";
import DeleteItemPopup from "./DeleteItemPopup.jsx";
import AddItemPopup from "./AddItemPopup.jsx";
import EditItemPopup from "./EditItemPopup.jsx";
import InfoPopup from "./InfoPopup.jsx";

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
  const [infoPopup, setInfoPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
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
  function handleUpdateItemPrice(itemToUpdate) {
    setStockError("");

    searchTmeItems(token, itemToUpdate.partNumber)
      .then((supplierItems) => {
        const supplierItem = supplierItems[0];

        if (!supplierItem) {
          setInfoPopup({
            isOpen: true,
            title: "Preco nao encontrado",
            message:
              "Nenhum preco foi encontrado para este item no distribuidor.",
          });

          return null;
        }

        return updateItem(token, itemToUpdate._id, {
          location: itemToUpdate.location,
          quantity: itemToUpdate.quantity,
          minQuantity: itemToUpdate.minQuantity,
          lastPrice: Number(supplierItem.unitPrice) || itemToUpdate.lastPrice,
          currency: supplierItem.currency || itemToUpdate.currency,
          imageUrl: itemToUpdate.imageUrl || supplierItem.imageUrl || "",
        });
      })
      .then((updatedItem) => {
        if (!updatedItem) {
          return;
        }

        setStockItems((currentItems) =>
          currentItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
        );

        setInfoPopup({
          isOpen: true,
          title: "Preco atualizado",
          message: `O item ${updatedItem.name} foi atualizado com o preco mais recente encontrado no distribuidor.`,
        });
      })
      .catch(() => {
        setInfoPopup({
          isOpen: true,
          title: "Erro ao atualizar",
          message: "Nao foi possivel atualizar o preco do item.",
        });
      });
  }
  function handleCloseInfoPopup() {
    setInfoPopup({
      isOpen: false,
      title: "",
      message: "",
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

      <SearchForm
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />

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
          <StockTable
            items={visibleStockItems}
            onUpdatePrice={handleUpdateItemPrice}
            onEditItem={handleOpenEditPopup}
            onDeleteItem={handleOpenDeletePopup}
          />
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
                <SupplierTable
                  items={visibleDistributorResults}
                  onAddItem={handleOpenAddPopup}
                />

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

      <AddItemPopup
        isOpen={isAddPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleAddItemSubmit}
      />

      <DeleteItemPopup
        isOpen={isDeletePopupOpen}
        onClose={handleCloseDeletePopup}
        onDeleteItem={handleDeleteItem}
      />

      <EditItemPopup
        isOpen={isEditPopupOpen}
        item={itemToEdit}
        onClose={handleCloseEditPopup}
        onSubmit={handleEditItemSubmit}
      />
      <InfoPopup
        isOpen={infoPopup.isOpen}
        title={infoPopup.title}
        message={infoPopup.message}
        onClose={handleCloseInfoPopup}
      />
    </main>
  );
}

export default Search;
