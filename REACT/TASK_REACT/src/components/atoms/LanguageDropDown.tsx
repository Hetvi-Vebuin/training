import React from "react";

interface LanguageDropdownProps {
  languages: { code: string; lang: string }[];
  value: string;
  onChange: (language: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languages,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className=""
    >
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.lang}
        </option>
      ))}
    </select>
  );
};
