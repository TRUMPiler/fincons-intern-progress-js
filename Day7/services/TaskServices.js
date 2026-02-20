const mongoose = require("mongoose");
const Task = require("../models/Task");

const rateLimitStore = new Map();
const RATE_LIMIT = 5;
const TIME_WINDOW = 60 * 1000;

class TaskServices {

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

    async getAllTask(userId) {
        this.checkRateLimit(userId);

        return await Task.find({
            isDeleted: false
        });
    }
}

module.exports = new TaskServices();