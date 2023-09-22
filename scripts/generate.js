const { select } = require("@inquirer/prompts");
// const https = require("https");
const fs = require("fs");

// ---------------------------------------------------------------------------------------------------------------------

const LOCALES = {
  all: "all",
  en: "gb/en",
  "en-US": "us/en",
  "en-CA": "ca/en",
  "en-IN": "en/in",
  fr: "fr/fr",
  es: "es/es",
  //   "es-MX": "mx/es",
  de: "de/de",
  it: "it/it",
  "en-PT": "pt/en",
  "en-AU": "au/en",
  "en-NZ": "nz/en",
  "en-MX": "mx/en",
  "en-CN": "cn/en",
  "en-JP": "jp/en",
  "en-KR": "kr/en",
  "en-SA": "sa/en",
  "en-AE": "ae/en",
  // TODO: support more locales
  //   se: "se/sv",
  //   fi: "fi/fi",
  //   no: "no/no",
  //   pt: "pt/pt",
  //   "ar-AE": "ae/ar",
  //   "ar-EG": "eg/ar",
  //   "ar-KW": "kw/ar",
  //   "ar-QA": "qa/ar",
  //   "ar-SA": "sa/ar",

  // Locales on IKEA website
  // "en-PH": "ph/en",
  // "sl-SI": "si/sl",
  // "en-MX": "mx/en",
  // "es-MX": "mx/es",
  // "en-CN": "cn/en",
  // "zh-CN": "cn/zh",
  // "en-JO": "jo/en",
  // "ar-JO": "jo/ar",
  // "ar-AE": "ae/ar",
  // "ar-EG": "eg/ar",
  // "ar-KW": "kw/ar",
  // "ar-QA": "qa/ar",
  // "ar-SA": "sa/ar",
  // "ca-ES": "es/ca",
  // "th-TH": "th/th",
  // "ms-MY": "my/ms",
  // "en-PT": "pt/en",
  // "sk-SK": "sk/sk",
  // "pt-PT": "pt/pt",
  // "hr-HR": "hr/hr",
  // "cs-CZ": "cz/cs",
  // "en-AU": "au/en",
  // "en-CZ": "cz/en",
  // "en-EG": "eg/en",
  // "en-JP": "jp/en",
  // "en-KR": "kr/en",
  // "en-KW": "kw/en",
  // "en-QA": "qa/en",
  // "en-SA": "sa/en",
  // "en-US": "us/en",
  // "fr-CH": "ch/fr",
  // "hu-HU": "hu/hu",
  // "ja-JP": "jp/ja",
  // "ko-KR": "kr/ko",
  // "nl-NL": "nl/nl",
  // "en-NL": "nl/en",
  // "pl-PL": "pl/pl",
  // "ro-RO": "ro/ro",
  // "sr-RS": "rs/sr",
  // "en-CH": "ch/en",
  // "en-IN": "in/en",
  // "en-BH": "bh/en",
  // "ar-BH": "bh/ar",
  // "no-NO": "no/no",
  // "es-ES": "es/es",
  // "en-ES": "es/en",
  // "en-SG": "sg/en",
  // "en-AE": "ae/en",
  // "fi-FI": "fi/fi",
  // "fr-FR": "fr/fr",
  // "fr-CA": "ca/fr",
  // "en-CA": "ca/en",
  // "fr-BE": "be/fr",
  // "nl-BE": "be/nl",
  // "en-BE": "be/en",
  // "en-TH": "th/en",
  // "en-MY": "my/en",
  // "en-IE": "ie/en",
  // "da-DK": "dk/da",
  // "en-GB": "gb/en",
  // "gl-ES": "es/gl",
  // "eu-ES": "es/eu",
  // "en-MA": "ma/en",
  // "fr-MA": "ma/fr",
  // "ar-MA": "ma/ar",
  // "es-CL": "cl/es",
  // "he-IL": "il/he",
  // "en-OM": "om/en",
  // "ar-OM": "om/ar",
  // "de-CH": "ch/de",
  // "de-DE": "de/de",
  // "de-AT": "at/de",
  // "en-AT": "at/en",
  // "it-IT": "it/it",
  // "it-CH": "ch/it",
  // "es-CO": "co/es",
  // "sv-SE": "se/sv",
  // "zh-HK": "hk/zh",
  // "en-HK": "hk/en",
  // "es-DO": "do/es",
  // "en-DO": "do/en",
  // "en-GR": "gr/en",
  // "in-ID": "id/in",
  // "en-ID": "id/en",
  // "is-IS": "is/is",
  // "en-TR": "tr/en",
  // "lt-LT": "lt/lt",
  // "ru-LT": "lt/ru",
  // "en-LT": "lt/en",
  // "ru-RU": "ru/ru",
  // "en-CY": "cy/en",
  // "en-NZ": "nz/en",
  // "ee-EE": "ee/et",
  // "ru-EE": "ee/ru",
  // "en-EE": "ee/en",
  // "lv-LV": "lv/lv",
  // "ru-LV": "lv/ru",
  // "en-LV": "lv/en",
  // "et-LV": "lv/lv",
  // "zh-TW": "tw/zh",
  // "en-TW": "tw/en",
  // "uk-UA": "ua/uk",
};
const SORT_ORDERS = ["MOST_POPULAR", "RELEVANCE", "RATING", "NAME_ASCENDING"];
const COUNT = [10, 100, 500, 1000, 5000, 10000];

// ---------------------------------------------------------------------------------------------------------------------

/// Remove accents from word
String.prototype.removeAccents = function () {
  return this.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

/// Sort characters in word
String.prototype.sortCharacters = function () {
  return this.split("").sort().join("");
};

// ['APPLE', 'PAPLE', 'LEAPP', 'LEPAP', 'PLEAP', 'PLEPA'] -> ['APPLE']
function getUniqueCombinations(list = []) {
  const sortedWords = new Set();

  list.forEach((name) => {
    sortedWords.add(name.removeAccents().sortCharacters());
  });

  let uniqueLetterList = [];
  let uniqueLetterSortedList = [];

  list.forEach((name) => {
    const sortedLetters = name.removeAccents().sortCharacters();
    if (!uniqueLetterSortedList.includes(sortedLetters)) {
      uniqueLetterSortedList.push(sortedLetters);
      uniqueLetterList.push(name);
    }
  });

  return uniqueLetterList;
}

// ---------------------------------------------------------------------------------------------------------------------

function generateFromMasterList(masterItems, locale) {
  fs.mkdirSync(locale);
  fs.mkdirSync(`${locale}/names`);
  fs.mkdirSync(`${locale}/unique`);
  fs.mkdirSync(`${locale}/items`);

  const filteredList = [];
  const names = [];
  const itemsMap = {};

  for (var i = 0; i < masterItems.length; ++i) {
    const item = masterItems[i];
    const { name, typeName, mainImageUrl, mainImageAlt, pipUrl, id, contextualImageUrl } =
      item.type === "FEATURED_PRODUCT" ? item.featuredProduct : item.product;

    // Only need all of these info
    const filteredItem = {
      name,
      desc: typeName,
      image: contextualImageUrl ?? mainImageUrl,
      pImage: mainImageUrl,
      alt: mainImageAlt,
      url: pipUrl,
      id,
    };

    // Filter out non unique, short, and multi word names
    if (!names.includes(name) && !name.includes(" ") && name.length >= 4 && name.length <= 10) {
      names.push(name);

      itemsMap[name] = filteredItem;

      filteredList.push(filteredItem);
    }
  }

  const uniqueNames = getUniqueCombinations(names);

  console.log("names", names.length);
  console.log("uniqueNames", uniqueNames.length);

  // Names of a certain length
  [4, 5, 6, 7, 8, 9, 10].map((length) => {
    const lNames = names.filter((name) => name.length === length);

    // Write list of all names of length
    fs.writeFileSync(`./${locale}/names/${length}.json`, JSON.stringify(lNames, null, 2));

    const singleNames = getUniqueCombinations(lNames);

    // Write list of all single names of length
    fs.writeFileSync(`./${locale}/unique/${length}.json`, JSON.stringify(singleNames, null, 2));
  });

  // List of top 100 names
  fs.writeFileSync(`./${locale}/unique/easy.json`, JSON.stringify(uniqueNames.slice(0, 100).sort(), null, 2));
  // List of top 250 names
  fs.writeFileSync(`./${locale}/unique/medium.json`, JSON.stringify(uniqueNames.slice(0, 250).sort(), null, 2));
  // List of top 500 names
  fs.writeFileSync(`./${locale}/unique/hard.json`, JSON.stringify(uniqueNames.slice(0, 500).sort(), null, 2));
  // List of all names
  fs.writeFileSync(`./${locale}/unique/all.json`, JSON.stringify(uniqueNames.sort(), null, 2));

  // List of all names
  names.sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(`./${locale}/names/all.json`, JSON.stringify(names, null, 2));

  // name-to-item map and item master list
  filteredList.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(`./${locale}/items/map.json`, JSON.stringify(itemsMap));
  fs.writeFileSync(`./${locale}/items/list.json`, JSON.stringify(filteredList));
}

// ---------------------------------------------------------------------------------------------------------------------

async function generate(locale, sortOrder, count) {
  // curl https://sik.search.blue.cdtapps.com/fi/fi/search-result-page\?c\=sr\&subcategories-style\=tree-navigation\&sort\=MOST_POPULAR\&size\=10

  try {
    const ikeaMasterList = await fetch(
      `https://sik.search.blue.cdtapps.com/${LOCALES[locale]}/search-result-page?c=sr&subcategories-style=tree-navigation&sort=${sortOrder}&size=${count}`,
    ).then((res) => res.json());

    // Extract the items only
    const masterItems = ikeaMasterList.searchResultPage.products.main.items;

    // Generate the things we need
    generateFromMasterList(masterItems, locale);
  } catch (error) {
    console.error("! Failed to generate", error);
  }
}

// ---------------------------------------------------------------------------------------------------------------------

function generateForLocale(locale, sortOrder, count) {
  console.log(`>> Generating ${count} products for "${locale}" with sort order ${sortOrder}.`);
  console.log("Find your files here: ");
  console.log(`${locale}/names - List of all non-duplicate product names`);
  console.log(`${locale}/unique - List of all non-duplicate and non-combinatorial product names`);
  console.log(`${locale}/items - List and name-item map of all products`);

  generate(locale, sortOrder, count);
}

// ---------------------------------------------------------------------------------------------------------------------

async function main() {
  const locale = await select({
    message: "Locale to generate for",
    choices: Object.keys(LOCALES).map((key) => ({ name: key, value: key })),
  });

  const sortOrder = await select({
    message: "Sort order",
    choices: SORT_ORDERS.map((key) => ({ name: key, value: key })),
  });

  // const count = 10000;
  const count = await select({
    message: "Number of products to generate",
    choices: COUNT.map((key) => ({ name: key, value: key })),
  });

  if (locale === "all") {
    Object.keys(LOCALES).forEach((locale) => {
      generateForLocale(locale, sortOrder, count);
    });
  } else {
    generateForLocale(locale, sortOrder, count);
  }
}

// ---------------------------------------------------------------------------------------------------------------------

main();
