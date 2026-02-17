// app.js

const math = require('./math');
const logger = require('./logger');
const _ = require('lodash'); // external npm dependency

/**
 * Adds two numbers and logs the result.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {void}
 */
const sum = math.add(10, 5);
logger.log(`Sum is: ${sum}`);

/**
 * Reverses an array using lodash and logs the result.
 * @param {Array} numbers - The array to reverse.
 * @returns {void}
 */
const numbers = [1, 2, 3, 4, 5];
const reversed = _.reverse([...numbers]);

logger.log(`Original: ${numbers}`);
logger.log(`Reversed using lodash: ${reversed}`);

/**
 * Attempts to divide two numbers and handles errors.
 * @param {number} a - The numerator.
 * @param {number} b - The denominator.
 * @returns {void}
 */
try {
  const result = math.divide(10, 2);
} catch (err) {
  logger.error("Operation failed");
}
