const lodash = require("lodash");
const { isNumber } = lodash;

/**
 * Adds two numbers if both are valid numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number|null} The sum of the two numbers, or null if inputs are invalid.
 */
function add(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
        console.log("only digits allowed");
        return null;
    }
    return a + b;
}

/**
 * Subtracts the second number from the first if both are valid numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number|null} The difference of the two numbers, or null if inputs are invalid.
 */
function subtract(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
        console.log("only digits allowed");
        return null;
    }
    return a - b;
}

/**
 * Multiplies two numbers if both are valid numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number|null} The product of the two numbers, or null if inputs are invalid.
 */
function multiply(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
        console.log("only digits allowed");
        return null;
    }
    return a * b;
}

/**
 * Divides the first number by the second if both are valid numbers and the divisor is not zero.
 * @param {number} a - The numerator.
 * @param {number} b - The denominator.
 * @returns {number|null} The quotient, or null if inputs are invalid.
 * @throws {Error} If division by zero is attempted.
 */
function divide(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
        console.log("only digits allowed");
        return null;
    }
    if (b === 0) {
        throw new Error("division by 0 is not allowed");
    }
    return a / b;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
