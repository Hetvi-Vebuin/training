import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../molecules/LanguageSelector";
// import LanguageButton from "../atoms/LanguageButton";

const LoginForm = () => {
  const {t}=useTranslation()

  return (
    <>
      <div className="container">
        <LanguageSelector/>
        {/* <LanguageButton { code, isSelected, onClick }  */}
        <h1>{t("loginText")}</h1>
      </div>
    </>
  );
};

export default LoginForm;
