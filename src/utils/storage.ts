import { LANGUAGES } from "@/app/i18n/settings";

export function clearAllLocalesDataExcept(locale: string) {
  if (typeof window === undefined) {
    return;
  }

  const keys = Object.keys(window.localStorage);

  // Clear all locales data except the current one
  for (const key of keys) {
	const keyLocale = key.split("_")[0];
    if (LANGUAGES.includes(keyLocale) && keyLocale !== locale) {
      window.localStorage.removeItem(key);
    }
  }
}
