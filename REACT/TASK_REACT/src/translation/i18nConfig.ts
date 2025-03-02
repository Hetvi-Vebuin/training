import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en/Translation";
import { hi } from "./hi/Translation";

const currentLanguageFromLocalstorage = JSON.parse(
  localStorage.getItem("persist:lng") as string
);
let currentLanguage;
if (currentLanguageFromLocalstorage) {
   currentLanguage = JSON.parse(
    currentLanguageFromLocalstorage.lng
  );
}
i18next.use(initReactI18next).init({
  lng: currentLanguage,
  fallbackLng: "en",
  // debug:true,
  // returnObject:true,
  resources: {
    en: en,
    hi: hi,
  },
});
