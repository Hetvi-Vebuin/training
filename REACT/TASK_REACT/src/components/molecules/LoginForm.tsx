import style from "../styles/LoginForm.module.scss";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../data/schemas/LoginSchema";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  return (
    <div className={style.global}>
      <form
        onSubmit={handleSubmit((data) => {onSubmit(data.email, data.password)
        })}
        className={style.form_container}
      >
        <h2 className={style.form_container__title}>{t("LOGIN.TITLE")}</h2>

        <label className={style.label}>{t("LOGIN.EMAIL")}</label>
        <Input
          type="email"
          name="email"
          registerProps={register("email")}
          placeholder={t("LOGIN.EMAIL_PLACEHOLDER")}
        />
        {errors.email?.message && (
          <p className={style.error}>{String(errors.email.message)}</p>
        )}
        <p> </p>
        <label className={style.label}>{t("LOGIN.PASSWORD")}</label>
        <Input
          type="password"
          name="password"
          registerProps={register("password")}
          placeholder={t("LOGIN.PASSWORD_PLACEHOLDER")}
        />

        {errors.password?.message && (
          <p className={style.error}>{String(errors.password.message)}</p>
        )}

        <Button type="submit" text={t("LOGIN.LOGIN_BUTTON")} />

        <p className={style.sign_up}>
          {t("LOGIN.NO_ACCOUNT")}{" "}
          <NavLink to="register" className={style.sign_up_link}>
            {t("LOGIN.SIGN_UP")}
          </NavLink>
        </p>
      </form>
    </div>
  );
};
