function SupplierTable({ items, onAddItem }) {
  return (
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.imageUrl ? (
                  <img
                    className="search__item-image"
                    src={item.imageUrl}
                    alt={item.manufacturerPartNumber}
                  />
                ) : (
                  <div className="search__image-placeholder">CI</div>
                )}
              </td>
              <td>{item.supplier}</td>
              <td>{item.manufacturerPartNumber}</td>
              <td>{item.manufacturer}</td>
              <td>{item.description}</td>
              <td>{item.availability}</td>
              <td>
                {item.currency} {Number(item.unitPrice).toFixed(4)}
              </td>
              <td>
                <button
                  className="search__icon-button"
                  type="button"
                  aria-label="Adicionar ao almoxarifado"
                  title="Adicionar ao almoxarifado"
                  onClick={() => onAddItem(item)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierTable;
