const mongoose = require("mongoose");
const Task = require("../models/Task");

const rateLimitStore = new Map();
const RATE_LIMIT = 5;
const TIME_WINDOW = 60 * 1000;

/**
 * TaskServices - encapsulates task-related data operations and protections.
 * - Public methods perform CRUD operations on Task documents.
 * - All public methods accept an optional caller id for rate limiting.
 * - Mutating operations run inside MongoDB transactions to ensure consistency.
 */
class TaskServices {

    /**
     * checkRateLimit: simple in-memory rate limiter per caller id.
     * - Not suitable for multi-instance deployments; use Redis or a shared store for production.
     * @param {String} userId - Identifier of the caller used to track request counts.
     * @throws Error when the caller exceeds configured RATE_LIMIT within TIME_WINDOW.
     */
    checkRateLimit(userId) {
        const currentTime = Date.now();
        const userData = rateLimitStore.get(userId) || {
            count: 0,
            startTime: currentTime
        };

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
     * createTask: create a new Task document inside a transaction.
     * @param {Object} task - Payload containing task fields (title, description, author, ...).
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The saved Task document populated with `author`.
     */
    async createTask(task, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const newTask = new Task(task);
            const saved = await newTask.save({ session });

            await session.commitTransaction();
            await saved.populate("author");

            return saved;

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
     * markTask: mark the specified task as completed in a transaction.
     * @param {String} id - Task document id.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The updated Task document.
     */
    async markTask(id, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const updated = await Task.findByIdAndUpdate(
                id,
                { markAsCompleted: true },
                { new: true, session }
            );

            if (!updated) {
                throw new Error("Task not found");
            }

            await session.commitTransaction();
            return updated;

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
     * updateTask: update a Task's fields inside a transaction, ignoring logically deleted tasks.
     * @param {String} id - Task document id.
     * @param {Object} data - Fields to update.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The updated Task document.
     */
    async updateTask(id, data, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const updated = await Task.findOneAndUpdate(
                { _id: id, isDeleted: false },
                data,
                { new: true, session }
            );

            if (!updated) {
                throw new Error("Task not found or already deleted");
            }

            await session.commitTransaction();
            return updated;

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
     * deleteTask: logically delete a task by setting isDeleted and deletedAt in a transaction.
     * @param {String} id - Task document id.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The logically deleted Task document.
     */
    async deleteTask(id, userId) {
        this.checkRateLimit(userId);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const existing = await Task.findOne(
                { _id: id, isDeleted: false }
            ).session(session);

            if (!existing) {
                throw new Error("Task not found or already deleted");
            }

            existing.isDeleted = true;
            existing.deletedAt = Date.now();

            await existing.save({ session });

            await session.commitTransaction();
            return existing;

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
     * getSingleTask: retrieve a single non-deleted task by id.
     * @param {String} id - Task document id.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Object>} The Task document.
     */
    async getSingleTask(id, userId) {
        this.checkRateLimit(userId);

        const task = await Task.findOne({
            _id: id,
            isDeleted: false
        });

        if (!task) {
            throw new Error("Task not found");
        }

        return task;
    }

    /**
     * getAllTask: list all non-deleted tasks.
     * @param {String} userId - Caller id used for rate limiting.
     * @returns {Promise<Array>} Array of Task documents.
     */
    async getAllTask(userId) {
        this.checkRateLimit(userId);

        return await Task.find({
            isDeleted: false
        });
    }
}

module.exports = new TaskServices();