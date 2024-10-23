import { GetTranslationOutput } from "@dnd/shared";
import i18next from "i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    backend: {
      reloadInterval: false,
      request: async (_options, url, _payload, callback) => {
        try {
          const locale = url.split("/")[2];
          if (!locale.includes("-")) {
            return callback(undefined, { status: 200, data: {} });
          }

          const namespace = url.split("/")[3].replace(".json", "");
          const requestUrl = `${import.meta.env.VITE_API_URL}/translation/public/get-translation/${locale}/${namespace}`;
          const response = await fetch(requestUrl, { method: "GET" });
          const data: GetTranslationOutput = await response.json();
          return callback(undefined, {
            status: 200,
            data: data.translations,
          });
        } catch (error) {
          return callback(error, null!);
        }
      },
    },
    lng: "fr-FR",
    fallbackLng: "fr-FR",
    debug: false,
    ns: ["common"],
    defaultNS: "common",
    fallbackNS: "common",
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
