// Demonstrates the use of setTimeout, Promises, and async/await in JavaScript.

// Example 1: Using setTimeout to delay execution.
(() => {
    console.log("before"); // Log before the timeout
    setTimeout(() => {
        console.log("in timeout"); // Log after a 3-second delay
    }, 3000);
    console.log("after"); // Log immediately after setting the timeout
})();

// Example 2: Using Promises to handle asynchronous operations.
let count = 2; // Simulate a condition for resolving or rejecting the Promise

const myPromise = () => new Promise((resolve, reject) => {
    if (count === 1) resolve("foo"); // Resolve the Promise if count is 1
    else reject("GG"); // Reject the Promise otherwise
});

// Handle the Promise using then and catch.
await myPromise()
    .then((value) => { console.log(value); }) // Log the resolved value
    .catch((value) => { console.log("rejected", value); }); // Log the rejection reason

// Example 3: Using async/await to handle Promises more cleanly.
(async () => {
    await myPromise()
        .then((value) => {
            console.log("Value accepted is", value); // Log the resolved value
        })
        .catch((err) => {
            console.error("Value rejected is", err); // Log the rejection reason
        });
})();