import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <div className="container-fluid p-0">
      <nav
        className="navbar border-bottom border-body"
        style={{ backgroundColor: "#0077d4" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Dynamo Tracker</span>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
