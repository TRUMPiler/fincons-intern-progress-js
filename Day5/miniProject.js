/**
 * Sets up an Express server to manage users.
 * Provides routes to create, fetch, and delete users.
 */
const express = require("express");
const User = require("./User");
const CustomResponse = require("./CustomResponse");

const app = express();
let Users = [];

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

/**
 * Creates a new user.
 * @route POST /users
 * @returns {User|object} The created user or an error message.
 */
app.post("/users", (req, res) => {
    const { id, name, email, address } = req.body;

    if (!id || !name || !email || !address) {
        return res.status(400).json({
            error: "id, name, email and address are required"
        });
    }

    if (Users.some(u => u.id === id)) {
        return res.status(409).json({
            error: "User with this id already exists"
        });
    }

    const user = new User(id, name, email, address);
    Users.push(user);

    return res.status(201).json(user);
});

/**
 * Fetches all users.
 * @route GET /users
 * @returns {CustomResponse} A custom response object containing all users.
 */
app.get("/users", (req, res) => {
    const body = Users.map(user => user.toJSON ? user.toJSON() : user);

    const customResponse = new CustomResponse(
        new Date().toISOString(),
        200,
        body
    );

    return res.status(200).json(customResponse.toJson());
});

/**
 * Deletes a user by ID.
 * @route DELETE /users/:id
 * @returns {CustomResponse|object} A success message or an error message.
 */
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    const originalLength = Users.length;

    Users = Users.filter(user => user.id !== id);

    if (Users.length === originalLength) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    const response = new CustomResponse(
        new Date().toISOString(),
        200,
        "User deleted successfully"
    );

    return res.status(200).json(response.toJson());
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});
