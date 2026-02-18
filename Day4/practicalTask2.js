/**
 * Demonstrates synchronous and asynchronous file reading in Node.js.
 * Uses both fs and fs.promises modules to read a file.
 */
const file = require("fs");
const fsPromise = require("fs").promises;

// Synchronously read a file and log its content
const data = file.readFileSync("./ReadMe.txt", 'utf-8');
console.log("File Data:\n" + data + "\n\n");

// Asynchronously read a file and log its content
(async () => {
    try {
        const data = await fsPromise.readFile("./ReadMe.txt", "utf-8");
        console.log("Async File Data:\n" + data);
    } catch (error) {
        console.error("Error reading file:", error.message);
    }
})();

