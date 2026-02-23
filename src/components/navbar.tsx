import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">{user?.email}</span>
              <button onClick={handleLogout} className="navbar-logout">
                Logout
              </button>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
