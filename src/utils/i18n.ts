import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationID from "../locales/id/translation.json";
import translationEN from "../locales/en/translation.json";

// the translations
const resources = {
  id: {
    translation: translationID,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next as any) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "id",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      // wait: false,
      useSuspense: true
    },
  } as any);

export default i18n;
