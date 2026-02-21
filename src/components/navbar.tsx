import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("Navbar must be used within AuthProvider");
  }

  const { user, isAuthenticated, logout } = authContext;

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
