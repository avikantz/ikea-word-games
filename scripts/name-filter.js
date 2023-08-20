const fs = require("fs");

const NAMES = require("../src/app/api/list/names.json");

// ['APPLE', 'PAPLE', 'LEAPP', 'LEPAP', 'PLEAP', 'PLEPA'] -> ['APPLE']
function getUniqueCombinations(list = []) {
	const sortedWords = new Set();

	list.forEach((name) => {
	  const sortedLetters = name.split("").sort().join("");
	  sortedWords.add(sortedLetters);
	});
	
	let uniqueLetterList = [];
	let uniqueLetterSortedList = [];
	
	list.forEach((name) => {
		const sortedLetters = name.split("").sort().join("");
		if (!uniqueLetterSortedList.includes(sortedLetters)) {
			uniqueLetterSortedList.push(sortedLetters);
			uniqueLetterList.push(name);
		}
	});

	return uniqueLetterList;
}

const uniqueNames = getUniqueCombinations(NAMES);
fs.writeFileSync(
  "./unique.json",
  JSON.stringify(uniqueNames, null, 2)
);

// Names of a certain length
[4, 5, 6, 7, 8, 9, 10].map((length) => {
  const lNames = NAMES.filter((name) => name.length === length);

  // Write list of all names of length
  fs.writeFileSync(`./names/${length}.json`, JSON.stringify(lNames, null, 2));

  const singleNames = getUniqueCombinations(lNames);

  // Write list of all single names of length
  fs.writeFileSync(
    `./unique/${length}.json`,
    JSON.stringify(singleNames, null, 2)
  );
});
