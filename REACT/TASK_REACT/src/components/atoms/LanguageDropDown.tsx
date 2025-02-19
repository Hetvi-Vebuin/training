import React from "react";

interface LanguageDropdownProps {
  languages: { code: string; lang: string }[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ languages, selectedLanguage, onChange }) => {
  return (
    <select value={selectedLanguage} onChange={(e) => onChange(e.target.value)} className="">
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.lang}
        </option>
      ))}
    </select>
  );
};
