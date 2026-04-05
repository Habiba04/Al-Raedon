import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import ar from "./ar.json";

// --- i18next configuration ---
i18n
  .use(LanguageDetector) // detects user language automatically
  .use(initReactI18next) // connects i18next to React
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

// --- handle direction dynamically ---
const setDocumentDirection = (lng: string) => {
  if (lng === "ar") {
    document.dir = "rtl";
    document.body.classList.add("rtl");
    document.body.classList.remove("ltr");
  } else {
    document.dir = "ltr";
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }
};

// set direction on load
setDocumentDirection(i18n.language);

// set direction whenever language changes
i18n.on("languageChanged", (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
