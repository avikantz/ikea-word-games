# Contributing to Ordspel/IKEA Word Games

Thank you for considering contributing to Ordspel/IKEA Word Games! 🙏

All types of contributions are welcome, including but not limited to:

| 🛠️ More technical | 🔧 Less technical | 🖊️ Non-technical |
|----------------|----------------|---------------|
| Code review | Reporting [a bug](https://github.com/avikantz/ikea-word-games/issues/new) | New game ideas |
| Code testing | Resolving [open issues](https://github.com/avikantz/ikea-word-games/issues) | Enhancements to existing games |
| Code maintenance and upgrade | Localizations review | New localizations |


Hacktoberfest contributors please refer to the [hacktoberfest participation](https://hacktoberfest.com/participation/).

--------

### Reviewing locale data

The locale specific translations are found in `src/app/i18n/locales/{locale}`.

The `default.json` currently includes all the translations used in the project.

Open a pull request to update existing ones.


### Adding a new locale

Use the `generate.js` script in `scripts` to generate product data. Refer to the script itself and [documentation](https://github.com/avikantz/ikea-word-games/blob/main/DOCUMENTATION.md) for more info.

Move the generated locale files to `public/data`

Add translations for the new locale to `src/app/i18n/locales/{locale}/default.json`

Add the new locale in `LANGUAGE_LIST` in `src/app/i18n/settings.js`

Refer to the [pull request for adding Portuguese](https://github.com/avikantz/ikea-word-games/pull/4) for an example.
