function Search() {
  return (
    <main className="search">
      <section className="search__header">
        <p className="search__eyebrow">Consulta de componentes</p>
        <h1 className="search__title">
          Pesquise itens do almoxarifado ou distribuidores.
        </h1>
        <p className="search__description">
          Use o numero do fabricante, nome do item ou palavra-chave para iniciar
          uma consulta. Nas proximas etapas, esta tela sera conectada a API
          externa e ao banco de dados.
        </p>
      </section>

      <section className="search__panel" aria-label="Formulario de pesquisa">
        <form className="search__form">
          <label className="search__label" htmlFor="search-query">
            Termo de pesquisa
          </label>
          <div className="search__form-row">
            <input
              className="search__input"
              id="search-query"
              name="query"
              type="text"
              placeholder="Ex: NE555, LM358, resistor 10k"
              required
            />
            <button className="search__button" type="submit">
              Pesquisar
            </button>
          </div>
        </form>
      </section>

      <section className="search__results" aria-label="Resultados">
        <p className="search__empty">Nada encontrado</p>
      </section>
    </main>
  );
}

export default Search;
