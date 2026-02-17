/**
 * Logs a message to the console with a [LOG] prefix.
 * @param {string} message - The message to log.
 */
function log(message) {
  console.log(`[LOG]: ${message}`);
}

/**
 * Logs an error message to the console with an [ERROR] prefix.
 * @param {string} message - The error message to log.
 */
function error(message) {
  console.error(`[ERROR]: ${message}`);
}

module.exports = {
  log,
  error
};
