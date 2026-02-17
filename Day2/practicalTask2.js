/**
 * Simulates fetching user data with a delay using a Promise.
 * @returns {Promise<string>} Resolves with user data or rejects with an error message.
 */
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false; // Simulate success or failure

      if (success) {
        resolve("User Data"); // Resolve the promise with user data
      } else {
        reject("Error occurred"); // Reject the promise with an error message
      }
    }, 1000); // Simulate a 1-second delay
  });
}

/**
 * Handles the fetchUser Promise and logs the result or error.
 * @returns {Promise<void>} Logs the resolved value or error message.
 */
const data = async () => {
  try {
    await fetchUser()
      .then((value) => {
        console.log("Value Return", value);
      });
  } catch (error) {
    console.error("Error is here", error);
  }
};

// Call the asynchronous function to fetch user data.
data();