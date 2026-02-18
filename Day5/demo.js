/**
 * Demonstrates error handling in an Express server.
 * Provides routes to simulate errors and handle them gracefully.
 */
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

/**
 * Home route with a welcome message.
 * @route GET /
 * @returns {string} A welcome message.
 */
app.get('/', (req, res) => {
  res.send('Welcome to the error handling demo. Try visiting /error-demo to see error handling in action.');
});

/**
 * Route that deliberately throws an error.
 * @route GET /error-demo
 * @throws {Error} Simulated error for demonstration.
 */
app.get('/error-demo', (req, res, next) => {
  try {
    throw new Error('Something went wrong!');
  } catch (error) {
    next(error);
  }
});

/**
 * Route that simulates an asynchronous error.
 * @route GET /async-error
 * @throws {Error} Simulated async error for demonstration.
 */
app.get('/async-error', async (req, res, next) => {
  try {
    await simulateAsyncError();
  } catch (error) {
    next(error);
  }
});

/**
 * Error-handling middleware.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);

  res.status(500).json({
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  });
});

/**
 * Helper function to simulate an asynchronous error.
 * @throws {Error} Simulated async error.
 */
async function simulateAsyncError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Async operation failed'));
    }, 100);
  });
}

// Start the server on port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});