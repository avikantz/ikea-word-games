export const FALLBACK_LANG = "en";
export const DEFAULT_NS = "common";

export const LANGUAGE_LIST = [
  {
    label: "English",
    emoji: "🇬🇧",
    value: FALLBACK_LANG,
  },
  {
    label: "Deutsch",
    emoji: "🇩🇪",
    value: "de",
  },
];

export const LANGUAGES = LANGUAGE_LIST.map(({ value }) => value);

export function getOptions(lng = FALLBACK_LANG, ns = DEFAULT_NS) {
  return {
    // debug: true,
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANG,
    lng,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  };
}

export function getLanguagesMap() {
  const languageMap = {};
  LANGUAGES.forEach((lang) => {
    languageMap[lang] = `/${lang}`;
  });
  return languageMap;
}
