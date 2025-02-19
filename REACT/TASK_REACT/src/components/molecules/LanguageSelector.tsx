import { useTranslation } from "react-i18next";
import { translationLanguage } from "../../util/appConstants/constant";
import { LanguageDropdown } from "../atoms/LanguageDropDown.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store.ts";
import { setLanguage } from "../../redux/features/languageReduser.ts";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const language = useSelector((state: RootState) => state.language.lng);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  return (
    <div className="btn-container">
      <LanguageDropdown
        languages={translationLanguage}
        selectedLanguage={language}
        onChange={changeLanguage}
      />
    </div>
  );
};
