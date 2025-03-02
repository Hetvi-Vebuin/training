import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.scss"; // Import SCSS
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/features/AuthSlice";
import { useDispatch } from "react-redux";
import LanguageSelector from "../molecules/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { user, clearUser } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const logoutPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    clearUser();
    navigate("/");
  };
  const handleClick=()=>{
    dispatch(logout());
    clearUser();
    navigate("/");
  }
  return (
    <nav className={styles.navbar}>
      <img src="src/assets/vite.svg" onClick={handleClick}/>
      {token && (
        <>
          <Link to="/dashboard" className={styles["nav-left"]}>
            {t("NAV.DASHBOARD")}
          </Link>
          <Link to="/profile" className={styles["nav-left"]}>
            {t("NAV.PROFILE")}
          </Link>
          <Link to="" onClick={logoutPage} className={styles["nav-left"]}>
            {t("NAV.LOGOUT")}
          </Link>
          {user && user?.role === "admin" && (
            <Link to="/get-details" className={styles["nav-left"]}>
              {t("NAV.GETDETAILS")}
            </Link>
          )}
        </>
      )}

      <div className={styles["nav-right"]}>
        <div className={styles["language-selector"]}>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
