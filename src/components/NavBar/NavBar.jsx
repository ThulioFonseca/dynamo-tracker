import "./Style.css";

const NavBar = () => {
  return (
    <div className="navbar-component justify-content-between">
      <div className="navbar-brand-container">
        <a href="/Home" className="navbar-brand">
          <h5 className="navbar-brand">Dynamo Tracker</h5>
        </a>
      </div>
      <div className="user-profile dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <span className="user-name-label">Usuário</span>
          <img src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-unknown-social-media-user-photo-700-209987478.jpg" alt="" width="28" height="28" className="rounded-circle me-1" />
        </a>
        <ul className="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="/Profile">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/SingOut">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
