function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {currentYear} Web Almoxarifado</p>
      <p className="footer__text">Projeto final TripleTen</p>
    </footer>
  );
}

export default Footer;
