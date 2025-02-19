import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageButtonProps {
  code: string;
  isSelected: boolean;
  onClick: () => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ code, isSelected, onClick }) => {
  const {t}=useTranslation();
  return (
    <button className={isSelected ? "selected" : ""} onClick={onClick}>
      {t(code)}
    </button>
  );
};

export default LanguageButton;
