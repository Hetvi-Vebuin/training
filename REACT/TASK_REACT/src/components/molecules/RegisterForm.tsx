import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useTranslation } from "react-i18next";
import styles from "../styles/RegisterForm.module.scss"; 
import { NavLink } from "react-router-dom";
import { RegisterFormProps } from "../../data/model/type/user";

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { t } = useTranslation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username, email, password, role);
      }}
      className={styles.register_form}
    >
      <h3>{t("REGISTER.TITLE")}</h3>
      <div className={styles.register_option}>
        <div className={styles.option}>
          <a href="#">
            <img src="./src/assets/google.png" alt="Google" />
            Google
          </a>
        </div>
        <div className={styles.option}>
          <a href="#">
            <img src="./src/assets/apple.png" alt="Apple" />
            Apple
          </a>
        </div>
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.USERNAME")}</label>
        <Input
          type="text"
          name="username"
          placeholder={t("REGISTER.USERNAME_PLACEHOLDER")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.EMAIL")}</label>
        <Input
          type="email"
          name="email"
          placeholder={t("REGISTER.EMAIL_PLACEHOLDER")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.PASSWORD")}</label>
        <Input
          type="password"
          name="password"
          placeholder={t("REGISTER.PASSWORD_PLACEHOLDER")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.ROLE")}</label>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">{t("REGISTER.USER_ROLE")}</option>
          <option value="admin">{t("REGISTER.ADMIN_ROLE")}</option>
        </select>
      </div>

      <Button type="submit" text={t("REGISTER.BUTTON")} />

      <p className={styles.signUp}>
        {t("REGISTER.ALREADY_HAVE_ACCOUNT")} <NavLink to="/">{t("REGISTER.LOGIN")}</NavLink>
      </p>
    </form>
  );
};
