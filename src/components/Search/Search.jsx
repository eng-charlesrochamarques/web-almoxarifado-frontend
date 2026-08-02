const stockItems = [
  {
    id: "stock-ne555",
    imageUrl: "",
    name: "Timer NE555",
    manufacturer: "Texas Instruments",
    manufacturerPartNumber: "NE555P",
    category: "Circuitos integrados",
    location: "Gaveta A-03",
    quantityInStock: 25,
    minimumQuantity: 10,
    lastUnitPrice: 0.32,
    currency: "EUR",
  },
];

const distributorResults = [
  {
    id: "tme-ne555",
    imageUrl: "",
    supplier: "TME",
    manufacturer: "Texas Instruments",
    manufacturerPartNumber: "NE555P",
    description: "Timer IC, single, DIP-8",
    availability: 1240,
    unitPrice: 0.32,
    currency: "EUR",
  },
];

function Search() {
  const hasStockItems = stockItems.length > 0;
  const hasDistributorResults = distributorResults.length > 0;

  return (
    <main className="search">
      <section className="search__header">
        <p className="search__eyebrow">Pesquisa de almoxarifado</p>
        <h1 className="search__title">
          Encontre itens internos ou consulte distribuidores.
        </h1>
        <p className="search__description">
          Pesquise primeiro no almoxarifado. Se o item ainda nao estiver
          cadastrado, consulte um distribuidor e adicione o resultado ao estoque
          informando os dados internos, como localizacao e quantidade.
        </p>
      </section>

      <section className="search__panel" aria-label="Formulario de pesquisa">
        <form className="search__form">
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
              required
            />
          </div>

          <button className="search__button" type="submit">
            Pesquisar
          </button>
        </form>
      </section>

      <section className="search__section" aria-label="Itens do almoxarifado">
        <div className="search__section-header">
          <div>
            <p className="search__section-eyebrow">Resultado interno</p>
            <h2 className="search__section-title">Itens no almoxarifado</h2>
          </div>
          <p className="search__results-count">
            {stockItems.length} item encontrado
          </p>
        </div>

        {hasStockItems ? (
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
                {stockItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="search__image-placeholder">CI</div>
                    </td>
                    <td>
                      <span className="search__item-name">{item.name}</span>
                      <span className="search__item-category">
                        {item.category}
                      </span>
                    </td>
                    <td>{item.manufacturerPartNumber}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.location}</td>
                    <td>{item.quantityInStock}</td>
                    <td>{item.minimumQuantity}</td>
                    <td>
                      {item.currency} {item.lastUnitPrice.toFixed(2)}
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
                        >
                          E
                        </button>
                        <button
                          className="search__icon-button search__icon-button_danger"
                          type="button"
                          aria-label="Excluir item"
                          title="Excluir item"
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

      <section className="search__section" aria-label="Busca em distribuidor">
        <div className="search__section-header">
          <div>
            <p className="search__section-eyebrow">Resultado externo</p>
            <h2 className="search__section-title">Distribuidor</h2>
          </div>
          <button
            className="search__button search__button_secondary"
            type="button"
          >
            Buscar em distribuidor
          </button>
        </div>

        {hasDistributorResults ? (
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
                {distributorResults.map((item) => (
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
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="search__empty">
            Nenhum resultado externo carregado. Use a busca em distribuidor.
          </p>
        )}
      </section>
    </main>
  );
}

export default Search;
