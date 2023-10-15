export const FALLBACK_LANG = "en";
export const DEFAULT_NS = "default";

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
    label: "Deutsch (Germany)",
    emoji: "🇩🇪",
    value: "de",
  },
  {
    label: "Español (Spain)",
    emoji: "🇪🇸",
    value: "es",
  },
  {
    label: "Français (France)",
    emoji: "🇫🇷",
    value: "fr",
  },
  {
    label: "Italiano (Italy)",
    emoji: "🇮🇹",
    value: "it",
  },
  {
    label: "Português (Portugal)",
    emoji: "🇵🇹",
    value: "pt",
  },
  {
    label: "Español (Mexico)",
    emoji: "🇲🇽",
    value: "es-MX",
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
    label: "English (UAE)",
    emoji: "🇦🇪",
    value: "en-AE",
  },
  {
    label: "English (KSA)",
    emoji: "🇸🇦",
    value: "en-SA",
  },
  {
    label: "Suomi (Finland)",
    emoji: "🇫🇮",
    value: "fi",
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
