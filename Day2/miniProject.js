const http = require('http');

/**
 * Ask the mock API for a list of users and print the result.
 *
 * - Calls the API URL below using `fetch` (Node 18+ or a polyfill).
 * - If the response looks good, it parses the JSON and prints it.
 * - If something goes wrong (network error or non-OK response), it
 *   prints a short error message so you know what happened.
 *
 * Returns: nothing useful — just logs to the console.
 */
const getUsers = async () => {
    try {
        const response = await fetch(
            "https://69942e99fade7a9ec0f4876d.mockapi.io/api/users/Users"
        );
        
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }


        const data = await response.json();
        console.log("Fetched Users:", data);

    } catch (error) {

        console.error("There was a problem while fetching:", error.message);
    }
};

/**
 * Ask the mock API for a list of users and print the result.
 *
 * - Calls the API URL below using `fetch` (Node 18+ or a polyfill).
 * - If the response looks good, it parses the JSON and prints it.
 * - If something goes wrong (network error or non-OK response), it
 *   prints a short error message so you know what happened.
 *
 * Returns: nothing useful — just logs to the console.
 */
const getOrders = async () => {
  try {
        const response = await fetch(
            "https://69942e99fade7a9ec0f4876d.mockapi.io/api/users/order"
        );
        
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }


        const data = await response.json();
        console.log("Fetched Users:", data);

    } catch (error) {

        console.error("There was a problem while fetching:", error.message);
    }
};

getUsers();
getOrders();

