import { LANGUAGES } from "@/app/i18n/settings";

export function clearAllLocalesDataExcept(locale: string) {
  if (typeof window === undefined) {
    return;
  }

  const keys = Object.keys(window.localStorage);

  for (const key of keys) {
    const keyLocale = key.split("_")[0];
    // Clear all locales data except the current one
    if (LANGUAGES.includes(keyLocale) && keyLocale !== locale) {
      window.localStorage.removeItem(key);
    }
    // Remove legacy keys
    if (key.startsWith("q_")) {
      window.localStorage.removeItem(key);
    }
  }
}
