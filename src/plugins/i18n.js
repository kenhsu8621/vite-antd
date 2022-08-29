import { createI18n } from 'vue-i18n'
import tw from "../lang/tw.json";
import en from "../lang/en.json";
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") ?? "tw", //ES11: Nullish coalescing operator
    fallbackLocale: "tw",
    messages: {
        "tw": tw,
        "en": en,
    }
});

export default i18n