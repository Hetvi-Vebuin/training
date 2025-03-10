import { useTranslation } from "react-i18next";
import { translationLanguage } from "../../util/appConstants/constant";
import { LanguageDropdown } from "../atoms/LanguageDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";
import { setLanguage } from "../../redux/features/LanguageSlice";

const LanguageSelector = () => {
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
        value={language}
        onChange={changeLanguage}
      />
    </div>
  );
};

export default LanguageSelector
