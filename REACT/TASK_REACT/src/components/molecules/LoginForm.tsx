import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useTranslation } from "react-i18next";
import style from "../styles/LoginForm.module.scss";
import { NavLink } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  return (
    <div className={style.global}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className={style.form_container}
    >
      <h2 className={style.form_container__title}>{t("LOGIN.TITLE")}</h2>

      <div className={style.login_option}>
        <div className={style.option}>
          <a href="#">
            <img src="./src/assets/google.png" alt="Google" />
            Google
          </a>
        </div>
        <div className={style.option}>
          <a href="#">
            <img src="./src/assets/apple.png" alt="Apple" />
            Apple
          </a>
        </div>
      </div>

      <label className={style.label}>{t("LOGIN.EMAIL")}</label>
      <Input
        type="email"
        name="email"
        placeholder={t("LOGIN.EMAIL_PLACEHOLDER")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className={style.label}>{t("LOGIN.PASSWORD")}</label>
      <Input
        type="password"
        name="password"
        placeholder={t("LOGIN.PASSWORD_PLACEHOLDER")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" text={t("LOGIN.LOGIN_BUTTON")} />

      <p className={style.sign_up}>
        {t("LOGIN.NO_ACCOUNT")} <NavLink to="register" className={style.sign_up_link}>{t("LOGIN.SIGN_UP")}</NavLink>
      </p>
    </form>
    </div>
  );
};
