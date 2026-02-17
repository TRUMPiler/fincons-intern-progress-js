/**
 * Demonstrates the use of setTimeout to delay execution.
 * Logs messages before, during, and after the timeout.
 */
(() => {
    console.log("before");
    setTimeout(() => {
        console.log("in timeout");
    }, 3000);
    console.log("after");
})();

/**
 * Demonstrates the use of Promises to handle asynchronous operations.
 * Resolves or rejects based on the value of `count`.
 * @returns {Promise<string>} Resolves with "foo" or rejects with "GG".
 */
let count = 2;
const myPromise = () => new Promise((resolve, reject) => {
    if (count === 1) resolve("foo");
    else reject("GG");
});

/**
 * Handles the myPromise Promise using then and catch.
 * Logs the resolved value or rejection reason.
 */
await myPromise()
    .then((value) => { console.log(value); })
    .catch((value) => { console.log("rejected", value); });

/**
 * Demonstrates the use of async/await to handle Promises.
 * Logs the resolved value or rejection reason.
 */
(async () => {
    await myPromise()
        .then((value) => {
            console.log("Value accepted is", value);
        })
        .catch((err) => {
            console.error("Value rejected is", err);
        });
})();