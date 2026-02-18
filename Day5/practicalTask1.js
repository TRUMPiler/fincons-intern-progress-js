/**
 * Sets up an Express server with middleware and routes.
 * Handles GET and POST requests for specific routes.
 */
const express = require("express");
const server = express();
const Responses = require("./CustomResponse");
const Port = process.env.PORT;

// Middleware to parse JSON requests
server.use(express.json());

// Custom middleware to log a message for every request
server.use((request, response, next) => {
    console.log("Middleware Started Successfully");
    next();
});

/**
 * Handles GET requests to fetch data by ID.
 * @route GET /:id
 * @returns {string} A placeholder string "data".
 */
server.get("/:id", (req, res) => {
    res.status(200).send("data");
});

/**
 * Handles POST requests to create a new resource.
 * @route POST /create
 * @returns {CustomResponse} A custom response object with the request body.
 */
server.post("/create", (req, res) => {
    let body = [];
    body = req.body;
    console.log(body);
    const response = new Responses(Date.now().toString(), 200, body);
    res.status(response.status).send(response);
});

// Start the server on the specified port
server.listen(Port, () => {
    console.log("Server Started at: http://localhost:" + Port);
});
