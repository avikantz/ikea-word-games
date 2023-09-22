declare global {
  interface String {
    /// Shuffle a word
    shuffle(): string;
    /// Remove accents from word
    removeAccents(): string;
    /// Clean word
    clean(): string;
    /// Remove whitespaces
    removeWhitespaces(): string;
    /// Sort characters in word
    sortCharacters(): string;
    /// Filter string to only include the given string/character(s)
    filter(c: string): string;
  }
}

/// Shuffle a word
String.prototype.shuffle = function () {
  let shuffled = "";
  // Prevent same word
  while (shuffled === "" || shuffled === this) {
    shuffled = this.split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
  return shuffled;
};

/// Remove accents from word
String.prototype.removeAccents = function () {
  return this.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

/// Clean a string
String.prototype.clean = function () {
  return this.normalize("NFD").replace(/[^\w\s]+/g, " ").replace(/\s+/g, " ").trim();
};

/// Remove whitespaces
String.prototype.removeWhitespaces = function () {
  return this.replace(/\s/g, "");
};

/// Sort characters in word
String.prototype.sortCharacters = function () {
  return this.split("").sort().join("");
};

/// Filter string to only include the given string/character(s)
String.prototype.filter = function (c: string) {
  return this.split("")
    .filter((char) => char === c)
    .join("");
};

/// Match words, ignoring accents and case
export const matchWords = (word1: string, word2: string) => {
  return word1.removeAccents() === word2.removeAccents();
};

/// Match characters in words, ignoring accents and case
export const matchCharacters = (word1: string, word2: string) => {
  return word1.removeAccents().sortCharacters() === word2.removeAccents().sortCharacters();
};

/// Replace characters with question marks
export const replaceWithQuestionMarks = (word: string) => {
  return word.removeAccents().replace(/\w/g, "?");
};
