const fs = require("fs");

const ikeaMasterList = require("./ikea.json");

const masterItems = ikeaMasterList.searchResultPage.products.main.items;

const filteredItems = [];
const names = [];
const itemsMap = {};

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

for (var i = 0; i < masterItems.length; ++i) {
  const item = masterItems[i];
  const {
    name,
    typeName,
    mainImageUrl,
    mainImageAlt,
    pipUrl,
    id,
    contextualImageUrl,
  } = item.type === "FEATURED_PRODUCT" ? item.featuredProduct : item.product;

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

    filteredItems.push(filteredItem);
  }
}

const uniqueNames = getUniqueCombinations(names);

console.log('names', names.length);
console.log('uniqueNames', uniqueNames.length);


fs.writeFileSync("./easy.json", JSON.stringify(uniqueNames.filter(name => name.length < 7).slice(0, 100).sort(), null, 2)); // List of all names
fs.writeFileSync("./medium.json", JSON.stringify(uniqueNames.filter(name => name.length < 9).slice(0, 250).sort(), null, 2)); // List of all names
fs.writeFileSync("./hard.json", JSON.stringify(uniqueNames.slice(0, 500).sort(), null, 2)); // List of all names
fs.writeFileSync("./all.json", JSON.stringify(uniqueNames.sort(), null, 2)); // List of all names

names.sort((a, b) => a.localeCompare(b));
filteredItems.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync("./names.json", JSON.stringify(names, null, 2)); // List of all names

fs.writeFileSync("./item-map.json", JSON.stringify(itemsMap));

fs.writeFileSync("./filtered.json", JSON.stringify(filteredItems));
