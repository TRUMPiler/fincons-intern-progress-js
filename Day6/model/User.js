const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    password:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

class User {
    // Private fields for the User class
    #id;
    #name;
    #email;
    #address;
    #password;
    #createdAt;

    // Constructor to initialize the User object
    constructor(id, name, email, address, password) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#address = address;
        this.#password = password;
    }

    // Getter and Setter for id
    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    // Getter and Setter for name
    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    // Getter and Setter for email
    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        this.#email = email;
    }

    // Getter and Setter for address
    getAddress() {
        return this.#address;
    }

    setAddress(address) {
        this.#address = address;
    }

    // Getter and Setter for password
    getPassword() {
        return this.#password;
    }

    setPassword(password) {
        this.#password = password;
    }

    // Getter and Setter for createdAt
    getCreatedAt() {
        return this.#createdAt;
    }

    setCreatedAt(createdAt) {
        this.#createdAt = createdAt;
    }
}
