declare global {
  interface String {
    /// Shuffle a word
    shuffle(): string;
    /// Remove accents from word
    removeAccents(): string;
    /// Sort characters in word
    sortCharacters(): string;
  }
}

/// Shuffle a word
String.prototype.shuffle = function () {
  return this.split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

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

/// Match words, ignoring accents and case
export const matchWords = (word1: string, word2: string) => {
  return word1.removeAccents() === word2.removeAccents();
};

/// Match characters in words, ignoring accents and case
export const matchCharacters = (word1: string, word2: string) => {
  return (
    word1.removeAccents().sortCharacters() ===
    word2.removeAccents().sortCharacters()
  );
};

/// Replace characters with question marks
export const replaceWithQuestionMarks = (word: string) => {
  return word.removeAccents().replace(/\w/g, "?");
};
