import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// fs cool stuff variables to read & write
const { readJSON, writeJSON, writeFile, readFile } = fs;

//*****************/ How to find the path*****************
// 1. I'll start from the current file I'm right now. (C_//.........../authors/index.js)
// import.meta.url -->>>> give us info about the current url of the current module.
// fileURLToPath converts that url into path
// const currentFilePath = fileURLToPath(import.meta.url); // C:\Users\emili\Desktop\book-marketplace-hackerspace\src\services\authors\index.js
// 2. Get the parent folder
// const parentFolder = dirname(currentFilePath);
// 3. I can concatenate the parent folder path withj authors json --> C:\Users\emili\Desktop\book-marketplace-hackerspace\src\services\authors\authors.json
// const authorsJsonPath = join(parentFolder, "authors.json");

const authorsJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../authors/authors.json"
);

// ************************** AUTHORS **********************************************************
export const readAuthors = () => readJSON(authorsJsonPath);
export const writeAuthors = authors => writeJSON(authorsJsonPath, authors, {
  spaces: 2
});