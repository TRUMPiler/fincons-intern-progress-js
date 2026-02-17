// This script demonstrates how to use command-line arguments in Node.js.

// Extract command-line arguments, ignoring the first two (node executable and script path).
const args = process.argv.slice(2);

// Get the first argument as the name.
const name = args[0];

// Print a greeting message using the provided name.
console.log("Hello " + name);