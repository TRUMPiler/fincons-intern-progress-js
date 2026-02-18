/**
 * Represents a User with basic details.
 */
class User {
    /**
     * Creates a new User instance.
     * @param {string} id - The unique identifier for the user.
     * @param {string} name - The name of the user.
     * @param {string} email - The email address of the user.
     * @param {string} address - The address of the user.
     */
    constructor(id, name, email, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
    }
}

module.exports = User;