function SearchForm({ searchQuery, onSearchQueryChange }) {
  return (
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
            onChange={onSearchQueryChange}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
