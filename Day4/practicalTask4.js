/**
 * Demonstrates various path module operations in Node.js.
 * Logs file and directory information, creates a folder, and writes a file.
 */
const path = require("path");
const fs = require("fs");

console.log("Current File Name:", path.basename(__filename));
console.log("Current Directory:", __dirname);

console.log("File Extension:", path.extname(__filename));
console.log("Directory Name:", path.dirname(__filename));

const filePath = path.join(__dirname, "files", "ReadMe.txt");
console.log("Joined Path:", filePath);

const absolutePath = path.resolve("files", "ReadMe.txt");
console.log("Resolved Absolute Path:", absolutePath);

const parsed = path.parse(filePath);
console.log("Parsed Path Object:", parsed);

const formatted = path.format({
    dir: __dirname,
    base: "ReadMe.txt"
});
console.log("Formatted Path:", formatted);

const folderPath = path.join(__dirname, "files");

// Create a folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

const newFilePath = path.join(folderPath, "ReadMe.txt");

// Write a file with some content
fs.writeFileSync(newFilePath, "Hello from path module!");

console.log("File created at:", newFilePath);
