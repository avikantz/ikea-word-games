export const FALLBACK_LANG = "en";
export const DEFAULT_NS = "common";

export const LANGUAGE_LIST = [
  {
    label: "English (UK)",
    emoji: "🇬🇧",
    value: FALLBACK_LANG,
  },
  {
    label: "English (US)",
    emoji: "🇺🇸",
    value: "en-US",
  },
  {
    label: "English (India)",
    emoji: "🇮🇳",
    value: "en-IN",
  },
  {
    label: "English (Canada)",
    emoji: "🇨🇦",
    value: "en-CA",
  },
  {
    label: "English (Australia)",
    emoji: "🇦🇺",
    value: "en-AU",
  },
  {
    label: "English (China)",
    emoji: "🇨🇳",
    value: "en-CN",
  },
  {
    label: "English (Japan)",
    emoji: "🇯🇵",
    value: "en-JP",
  },
  {
    label: "English (Korea)",
    emoji: "🇰🇷",
    value: "en-KR",
  },
  {
    label: "English (Portugal)",
    emoji: "🇵🇹",
    value: "en-PT",
  },
  {
    label: "English (KSA)",
    emoji: "🇸🇦",
    value: "en-SA",
  },
  {
    label: "English (UAE)",
    emoji: "🇦🇪",
    value: "en-AE",
  },
  {
    label: "Español (Spain)",
    emoji: "🇪🇸",
    value: "es",
  },
  {
    label: "Español (Mexico)",
    emoji: "🇲🇽",
    value: "es-MX",
  },
  {
    label: "Français (France)",
    emoji: "🇫🇷",
    value: "fr",
  },
  {
    label: "Deutsch (Germany)",
    emoji: "🇩🇪",
    value: "de",
  },
  {
    label: "Italiano (Italy)",
    emoji: "🇮🇹",
    value: "it",
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
