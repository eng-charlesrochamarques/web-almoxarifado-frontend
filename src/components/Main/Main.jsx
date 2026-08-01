import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__content">
          <p className="main__eyebrow">Gestao online de almoxarifado</p>
          <h1 className="main__title">
            Controle itens e atualize dados de fornecedores em um so lugar.
          </h1>
          <p className="main__description">
            O Web Almoxarifado ajuda a cadastrar, pesquisar e acompanhar itens
            do estoque, com suporte para consulta de preco e disponibilidade em
            distribuidores externos.
          </p>
          <Link className="main__button" to="/search">
            Pesquisar itens
          </Link>
        </div>
      </section>

      <section className="main__features" aria-label="Recursos principais">
        <article className="main__feature">
          <h2 className="main__feature-title">Cadastro de itens</h2>
          <p className="main__feature-text">
            Registre componentes com part number, fabricante, categoria,
            quantidade e localizacao.
          </p>
        </article>
        <article className="main__feature">
          <h2 className="main__feature-title">Busca rapida</h2>
          <p className="main__feature-text">
            Encontre itens cadastrados por nome, codigo, fabricante ou
            categoria.
          </p>
        </article>
        <article className="main__feature">
          <h2 className="main__feature-title">Atualizacao online</h2>
          <p className="main__feature-text">
            Consulte distribuidores para atualizar preco, moeda e
            disponibilidade.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Main;
