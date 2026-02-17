/**
 * Demonstrates how to use command-line arguments in Node.js.
 * Extracts the first argument as a name and prints a greeting message.
 * @param {string[]} args - Command-line arguments passed to the script.
 * @returns {void}
 */
const args = process.argv.slice(2);
const name = args[0];
console.log("Hello " + name);