/**
 * Generates maps and list of product names we need for the game.
 */

const fs = require("fs");
const { select } = require("@inquirer/prompts");

// ---------------------------------------------------------------------------------------------------------------------

const LOCALES = {
  all: "all",
  en: "gb/en",
  "en-US": "us/en",
  "en-CA": "ca/en",
  "en-IN": "in/en",
  fr: "fr/fr",
  es: "es/es",
  "es-MX": "mx/es",
  de: "de/de",
  it: "it/it",
  pt: "pt/pt",
  "en-PT": "pt/en",
  "en-AU": "au/en",
  "en-CN": "cn/en",
  "en-JP": "jp/en",
  "en-KR": "kr/en",
  "en-SA": "sa/en",
  "en-AE": "ae/en",
  fi: "fi/fi",
  se: "se/sv",

  // TODO: support more locales
  //   no: "no/no",
  //   "ar-AE": "ae/ar",
  //   "ar-EG": "eg/ar",
  //   "ar-KW": "kw/ar",
  //   "ar-QA": "qa/ar",
  //   "ar-SA": "sa/ar",

  // Locales on IKEA website
  // "ar-AE": "ae/ar",
  // "ar-BH": "bh/ar",
  // "ar-EG": "eg/ar",
  // "ar-JO": "jo/ar",
  // "ar-KW": "kw/ar",
  // "ar-MA": "ma/ar",
  // "ar-OM": "om/ar",
  // "ar-QA": "qa/ar",
  // "ar-SA": "sa/ar",
  // "ca-ES": "es/ca",
  // "cs-CZ": "cz/cs",
  // "da-DK": "dk/da",
  // "de-AT": "at/de",
  // "de-CH": "ch/de",
  // "de-DE": "de/de",
  // "ee-EE": "ee/et",
  // "en-AE": "ae/en",
  // "en-AT": "at/en",
  // "en-AU": "au/en",
  // "en-BE": "be/en",
  // "en-BH": "bh/en",
  // "en-CA": "ca/en",
  // "en-CH": "ch/en",
  // "en-CN": "cn/en",
  // "en-CY": "cy/en",
  // "en-CZ": "cz/en",
  // "en-DO": "do/en",
  // "en-EE": "ee/en",
  // "en-EG": "eg/en",
  // "en-ES": "es/en",
  // "en-GB": "gb/en",
  // "en-GR": "gr/en",
  // "en-HK": "hk/en",
  // "en-ID": "id/en",
  // "en-IE": "ie/en",
  // "en-IN": "in/en",
  // "en-JO": "jo/en",
  // "en-JP": "jp/en",
  // "en-KR": "kr/en",
  // "en-KW": "kw/en",
  // "en-LT": "lt/en",
  // "en-LV": "lv/en",
  // "en-MA": "ma/en",
  // "en-MX": "mx/en",
  // "en-MY": "my/en",
  // "en-NL": "nl/en",
  // "en-NZ": "nz/en",
  // "en-OM": "om/en",
  // "en-PH": "ph/en",
  // "en-PT": "pt/en",
  // "en-QA": "qa/en",
  // "en-SA": "sa/en",
  // "en-SG": "sg/en",
  // "en-TH": "th/en",
  // "en-TR": "tr/en",
  // "en-TW": "tw/en",
  // "en-US": "us/en",
  // "es-CL": "cl/es",
  // "es-CO": "co/es",
  // "es-DO": "do/es",
  // "es-ES": "es/es",
  // "es-MX": "mx/es",
  // "et-LV": "lv/lv",
  // "eu-ES": "es/eu",
  // "fi-FI": "fi/fi",
  // "fr-BE": "be/fr",
  // "fr-CA": "ca/fr",
  // "fr-CH": "ch/fr",
  // "fr-FR": "fr/fr",
  // "fr-MA": "ma/fr",
  // "gl-ES": "es/gl",
  // "he-IL": "il/he",
  // "hr-HR": "hr/hr",
  // "hu-HU": "hu/hu",
  // "in-ID": "id/in",
  // "is-IS": "is/is",
  // "it-CH": "ch/it",
  // "it-IT": "it/it",
  // "ja-JP": "jp/ja",
  // "ko-KR": "kr/ko",
  // "lt-LT": "lt/lt",
  // "lv-LV": "lv/lv",
  // "ms-MY": "my/ms",
  // "nl-BE": "be/nl",
  // "nl-NL": "nl/nl",
  // "no-NO": "no/no",
  // "pl-PL": "pl/pl",
  // "pt-PT": "pt/pt",
  // "ro-RO": "ro/ro",
  // "ru-EE": "ee/ru",
  // "ru-LT": "lt/ru",
  // "ru-LV": "lv/ru",
  // "ru-RU": "ru/ru",
  // "sk-SK": "sk/sk",
  // "sl-SI": "si/sl",
  // "sr-RS": "rs/sr",
  // "sv-SE": "se/sv",
  // "th-TH": "th/th",
  // "uk-UA": "ua/uk",
  // "zh-CN": "cn/zh",
  // "zh-HK": "hk/zh",
  // "zh-TW": "tw/zh",
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
  console.log("\n----------------------------------------\n");
  console.log(`>> Processing ${masterItems.length} items for "${locale}".\n`);

  console.log(`\t./${locale}/names - List of all non-duplicate product names`);
  console.log(`\t./${locale}/unique - List of all non-duplicate and non-combinatorial product names`);
  console.log(`\t./${locale}/items - List and name-item map of all products\n`);

  // Create directories
  fs.mkdirSync(`${locale}/names`, { recursive: true });
  fs.mkdirSync(`${locale}/unique`, { recursive: true });
  fs.mkdirSync(`${locale}/items`, { recursive: true });

  const filteredList = [];
  const names = [];
  const itemsMap = {};

  for (var i = 0; i < masterItems.length; ++i) {
    const item = masterItems[i];
    try {
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
    } catch (error) {
      console.error("\t\t!! Unable to parse item", locale, item);
    }
  }

  const uniqueNames = getUniqueCombinations(names);

  // Names of a certain length
  [4, 5, 6, 7, 8, 9, 10].map((length) => {
    const lNames = names.filter((name) => name.length === length);

    // Write list of all names of length
    fs.writeFileSync(`./${locale}/names/${length}.json`, JSON.stringify(lNames));
    console.log(`\t./${locale}/names/${length}.json: ${lNames.length} items`);

    const singleNames = getUniqueCombinations(lNames);

    // Write list of all single names of length
    fs.writeFileSync(`./${locale}/unique/${length}.json`, JSON.stringify(singleNames));
    console.log(`\t./${locale}/unique/${length}.json: ${singleNames.length} items`);
  });

  // List of top 100 names
  fs.writeFileSync(`./${locale}/unique/easy.json`, JSON.stringify(uniqueNames.filter(u => u.length < 7).slice(0, 100).sort()));
  console.log(`\t./${locale}/unique/easy.json: ${uniqueNames.slice(0, 100).length} items`);
  // List of top 250 names
  fs.writeFileSync(`./${locale}/unique/medium.json`, JSON.stringify(uniqueNames.filter(u => u.length < 8).slice(0, 250).sort()));
  console.log(`\t./${locale}/unique/medium.json: ${uniqueNames.slice(0, 250).length} items`);
  // List of top 500 names
  fs.writeFileSync(`./${locale}/unique/hard.json`, JSON.stringify(uniqueNames.filter(u => u.length < 10).slice(0, 500).sort()));
  console.log(`\t./${locale}/unique/hard.json: ${uniqueNames.slice(0, 500).length} items`);
  // List of all names
  fs.writeFileSync(`./${locale}/unique/all.json`, JSON.stringify(uniqueNames.sort()));
  console.log(`\t./${locale}/unique/all.json: ${uniqueNames.length} items`);

  // List of all names
  names.sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(`./${locale}/names/all.json`, JSON.stringify(names));
  console.log(`\t./${locale}/names/all.json: ${names.length} items`);

  // name-to-item map and item master list
  filteredList.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(`./${locale}/items/map.json`, JSON.stringify(itemsMap));
  console.log(`\t./${locale}/items/map.json: ${Object.keys(itemsMap).length} items`);
  fs.writeFileSync(`./${locale}/items/list.json`, JSON.stringify(filteredList));
  console.log(`\t./${locale}/items/list.json: ${filteredList.length} items`);
}

// ---------------------------------------------------------------------------------------------------------------------

async function generate(locale, sortOrder, count) {
  // curl https://sik.search.blue.cdtapps.com/us/en/search-result-page\?c\=sr\&subcategories-style\=tree-navigation\&sort\=MOST_POPULAR\&size\=10

  try {
    const ikeaMasterList = await fetch(
      `https://sik.search.blue.cdtapps.com/${LOCALES[locale]}/search-result-page?c=sr&subcategories-style=tree-navigation&sort=${sortOrder}&size=${count}`,
    ).then((res) => res.json());

    // Extract the items only
    const masterItems = ikeaMasterList.searchResultPage.products.main.items;

    // Generate the things we need
    generateFromMasterList(masterItems, locale);

    console.log("\n----------------------------------------\n");
  } catch (error) {
    console.error("! Failed to generate", error);
  }
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
    message: "Number of products to search for (max ~28,000)",
    choices: COUNT.map((key) => ({ name: key, value: key })),
  });

  if (locale === "all") {
    Object.keys(LOCALES).forEach(async (locale) => {
      if (locale === "all") return;
      await generate(locale, sortOrder, count);
    });
  } else {
    await generate(locale, sortOrder, count);
  }
}

// ---------------------------------------------------------------------------------------------------------------------

main();
