import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import styles from "../styles/RegisterForm.module.scss";
import { NavLink } from "react-router-dom";
import { RegisterFormProps } from "../../data/model/type/User";
import { registerSchema } from "../../data/schemas/RegisterSchema";

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });
  
  const { t } = useTranslation();
  console.log("ddd",);
  
  return (
    <form
      onSubmit={handleSubmit((data) =>        
        onSubmit(data.username, data.email, data.password, data.role)
      )}
      className={styles.register_form}
    >
      <h3>{t("REGISTER.TITLE")}</h3>

      <div className={styles.input_box}>
        <label>{t("REGISTER.USERNAME")}</label>
        <Input
          type="text"
          placeholder={t("REGISTER.USERNAME_PLACEHOLDER")}
          registerProps={register("username")} 
          name="username"       
        />
        {errors.username?.message && (
          <p className={styles.error}>{String(errors.username.message)}</p>
        )}
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.EMAIL")}</label>
        <Input
          type="email"
          name="email"
          placeholder={t("REGISTER.EMAIL_PLACEHOLDER")}
          registerProps={register("email")}
        />
        {errors.email?.message && (
          <p className={styles.error}>{String(errors.email.message)}</p>
        )}
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.PASSWORD")}</label>
        <Input
          type="password"
          name="password"
          placeholder={t("REGISTER.PASSWORD_PLACEHOLDER")}
          registerProps={register("password")}
        />
        {errors.password?.message && (
          <p className={styles.error}>{String(errors.password.message)}</p>
        )}
      </div>

      <div className={styles.input_box}>
        <label>{t("REGISTER.ROLE")}</label>
        <select {...register("role")}>
          <option value="user">{t("REGISTER.USER_ROLE")}</option>
          <option value="admin">{t("REGISTER.ADMIN_ROLE")}</option>
        </select>
        {errors.role?.message && (
          <p className={styles.error}>{String(errors.role.message)}</p>
        )}
      </div>

      <Button type="submit" text={t("REGISTER.BUTTON")} />

      <p className={styles.signUp}>
        {t("REGISTER.ALREADY_HAVE_ACCOUNT")}{" "}
        <NavLink className={styles.login_link} to="/">
          {t("REGISTER.LOGIN")}
        </NavLink>
      </p>
    </form>
  );
};
