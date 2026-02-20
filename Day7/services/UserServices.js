const User = require("../models/User");
const mongoose = require("mongoose");

const rateLimitStore = new Map();
const RATE_LIMIT = 5;
const TIME_WINDOW = 60 * 1000;

/**
 * UserService - encapsulates user-related data operations.
 * - Methods perform DB operations and enforce per-caller rate limiting.
 */
class UserService {

    /**
     * checkRateLimit: simple in-memory rate limiter per caller id.
     * - Not intended for distributed deployments; use Redis for that.
     * @param {String} userId - Identifier of the caller used to track limits.
     */
    checkRateLimit(userId) {
        const currentTime = Date.now();
        const userData = rateLimitStore.get(userId) || { count: 0, startTime: currentTime };

        if (currentTime - userData.startTime > TIME_WINDOW) {
            userData.count = 1;
            userData.startTime = currentTime;
        } else {
            userData.count += 1;
        }

        rateLimitStore.set(userId, userData);

        if (userData.count > RATE_LIMIT) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }
    }

    /**
     * createUser: create a new user within a transaction.
     * - Validates uniqueness of email before inserting.
     * @param {Object} data - User payload (name, email, password, role).
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The created User document.
     */
    async createUser(data, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            this.checkRateLimit(userId);

            const existingUser = await User.findOne({ email: data.email });
            if (existingUser) {
                throw new Error("Email already exists");
            }

            const user = new User(data);
            const savedUser = await user.save({ session });

            await session.commitTransaction();
            return savedUser;

        } catch (error) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw error;

        } finally {
            session.endSession();
        }
    }

    /**
     * getAllUsers: return all users in the database.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Array>} Array of User documents.
     */
    async getAllUsers(userId) {
        this.checkRateLimit(userId);
        return await User.find();
    }

    /**
     * getUserById: fetch a user by their id.
     * @param {String} id - User document id.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object|null>} The User document or null.
     */
    async getUserById(id, userId) {
        this.checkRateLimit(userId);
        return await User.findById(id);
    }

    /**
     * getUserByName: fetch a single user by name.
     * @param {String} name - The user's name.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object|null>} The User document or null.
     */
    async getUserByName(name, userId) {
        this.checkRateLimit(userId);
        return await User.findOne({ name });
    }

    /**
     * updateUser: update fields for a user inside a transaction.
     * @param {String} id - User document id.
     * @param {Object} data - Fields to update.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object|null>} The updated User document.
     */
    async updateUser(id, data, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                data,
                { new: true, session }
            );

            await session.commitTransaction();
            return updatedUser;

        } catch (error) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw error;

        } finally {
            session.endSession();
        }
    }

    /**
     * deleteUser: remove a user document inside a transaction.
     * @param {String} id - User document id.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object|null>} The deleted User document.
     */
    async deleteUser(id, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const deletedUser = await User.findByIdAndDelete(id, { session });

            await session.commitTransaction();
            return deletedUser;

        } catch (error) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw error;

        } finally {
            session.endSession();
        }
    }
}

module.exports = new UserService();