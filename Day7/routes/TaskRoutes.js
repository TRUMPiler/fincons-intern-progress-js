const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

/**
 * Task routes
 * - POST   /api/tasks        -> create a new task (payload in body)
 * - GET    /api/tasks        -> list all tasks
 * - GET    /api/tasks/:id    -> fetch a single task by id
 * - PUT    /api/tasks/update/:id -> update task fields by id
 * - PUT    /api/tasks/:id    -> mark task as complete
 * - DELETE /api/tasks/:id    -> logically delete a task
 *
 * Controllers are responsible for validation and using services to perform work.
 */
router.post("/", taskController.CreateTask);
router.get("/", taskController.GetAllTasks);
router.get("/:id", taskController.GetSingleTask);
router.put("/update/:id", taskController.updateTask);
router.put("/:id", taskController.MarkasComplete);
router.delete("/:id", taskController.DeleteTask);

module.exports = router;
