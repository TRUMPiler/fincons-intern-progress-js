const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

/**
 * User routes
 * - POST   /api/users     -> create a new user
 * - GET    /api/users     -> list all users
 * - GET    /api/users/:id -> fetch a single user by id
 *
 * (update/delete routes are commented out for now.)
 */
router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getUser);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.delete);

module.exports = router;
