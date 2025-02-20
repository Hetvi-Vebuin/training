import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en/translation";
import { hi } from "./hi/translation";
import storage from "redux-persist/lib/storage";

const storedData = await storage.getItem("persist:lng");
let lang;
if (storedData) {
  const parsedData = JSON.parse(storedData);
  lang = JSON.parse(parsedData.lng);
} else {
  lang = "en";
}

i18next.use(initReactI18next).init({
  lng: lang,
  fallbackLng: "en",
  // debug:true,
  // returnObject:true,
  resources: {
    en: en,
    hi: hi,
  },
});
