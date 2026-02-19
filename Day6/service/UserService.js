// Importing the User model
const User = require("../model/User");

class UserService {

    // Method to create a new user
    async createUser(data) {
        try {
            const user = new User(data);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    // Method to retrieve all users
    async getAllUsers() {
        return await User.find();
    }

    // Method to retrieve a user by their ID
    async getUserById(id) {
        return await User.findById(id);
    }

    // Method to retrieve a user by their name
    async getUserByName(name) {
        return await User.findOne({ name: name });
    }

    // Method to update a user's details by their ID
    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    // Method to delete a user by their ID
    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

// Exporting an instance of UserService
module.exports = new UserService();
