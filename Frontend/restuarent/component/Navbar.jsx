import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Shree Umiya Bhojnalaya</div>

      <div className="navbar-links">
        {/* CUSTOMER */}
        {role === "customer" && (
          <>
            <NavLink to="/home" className="nav-link">Home</NavLink>
            <NavLink to="/home#about" className="nav-link">About Us</NavLink>
            <NavLink to="/menu" className="nav-link">Menu</NavLink>
            <NavLink to="/dining" className="nav-link">Dining</NavLink>
          </>
        )}

        {/* STAFF */}
        {role === "staff" && (
          <>
            <NavLink to="/kitchen" className="nav-link">Kitchen</NavLink>
            <NavLink to="/collection" className="nav-link">Collection</NavLink>
          </>
        )}
      </div>

      {user && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}
