function StockTable({ items, onEditItem, onDeleteItem }) {
  return (
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
          {items.map((item) => (
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
                <span className="search__item-category">{item.category}</span>
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
                    onClick={() => onEditItem(item)}
                  >
                    E
                  </button>
                  <button
                    className="search__icon-button search__icon-button_danger"
                    type="button"
                    aria-label="Excluir item"
                    title="Excluir item"
                    onClick={() => onDeleteItem(item)}
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
  );
}

export default StockTable;
