import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector'; 
import { initReactI18next } from "react-i18next";

const langs: { [key: string]: string } = { "ja": "ja-JP" , "en": "en-US" };

export const getCurrentLang = (): string => {
    return langs[i18n.language];
}

const resources = {
    ja: {
        translation: {
            "Title": "映画検索アプリ",
            "SearchBoxPlaceholder": "検索ワードを入力",
            "NoDescription": "詳細がありません"
        }
    },
    en: {
        translation: {
            "Title": "Movie Searcher",
            "SearchBoxPlaceholder": "Enter word",
            "NoDescription": "No Description"
        }
    }
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'ja'],
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['navigator'],
            caches: []
        }
    })

export default i18n;