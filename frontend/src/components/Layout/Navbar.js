import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📝 CollabTodo</div>
      <div style={styles.links}>
        {!user ? (
          <>
            <Link style={styles.link} to="/">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/board">Board</Link>
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};


const styles = {
  nav: {
    background: "#34495e",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
  },
  button: {
    padding: "6px 12px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }
};

export default Navbar;
