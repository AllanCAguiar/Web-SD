export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          TotalUsers
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link" href="/index1">
                Listagem BD1
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/index2">
                Listagem BD2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/criacao">
                Criar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/verificacao">
                Verificar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/remocao">
                Remover
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
