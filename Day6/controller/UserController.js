const userService = require("../service/UserService");
class UserController {
    
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        const users = await userService.getAllUsers();
        res.json(users);
    }

    async getById(req, res) {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    }

    async update(req, res) {
        const updated = await userService.updateUser(req.params.id, req.body);
        res.json(updated);
    }

    async delete(req, res) {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    }
}

module.exports = new UserController();