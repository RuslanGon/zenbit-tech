import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Zenbit Tech</Link>
      <nav>
        {user ? (
          <span>Привет, {user.name}</span>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Log In</Link>
            <Link to="/register" className={styles.navLink}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
