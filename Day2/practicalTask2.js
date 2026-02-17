// Simulates fetching user data with a delay using a Promise.
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

// Asynchronous function to handle the fetchUser Promise.
const data = async () => {
  try {
    // Wait for the fetchUser Promise to resolve or reject
    await fetchUser()
      .then((value) => {
        console.log("Value Return", value); // Log the resolved value
      });
  } catch (error) {
    console.error("Error is here", error); // Log any errors that occur
  }
};

// Call the asynchronous function to fetch user data.
data();