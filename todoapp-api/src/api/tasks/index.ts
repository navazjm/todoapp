import express from "express";
import MessageResponse from "../../interfaces/responses/MessageResponse";
import { TaskResponse, TasksResponse } from "../../interfaces/responses/TasksReponse";
import prisma from "../../prisma";

const router = express.Router();

// get all tasks
router.get<{}, TasksResponse>("/", async (_, res, next) => {
    try {
        const allTasks = await prisma.task.findMany();
        res.json({
            tasks: allTasks
        });
    } catch (err) {
        next(err);
    }
});

// get task by id
router.get<{ id: string }, TaskResponse>("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const numId = parseInt(id);
        if (isNaN(numId) || numId < 0) {
            throw new Error("id is not a positive number");
        }
        const task = await prisma.task.findFirstOrThrow({
            where: { id: numId }
        });

        res.json({
            task: task,
            message: `task ${task.id} was found`
        });
    } catch (err) {
        next(err);
    }
});

// create a new task
router.post<{}, MessageResponse>("/", async (req, res, next) => {
    try {
        const { content } = req.body;
        const task = await prisma.task.create({
            data: {
                content: content
            }
        });
        res.json({
            message: `task '${task.content}' was created successfully`
        });
    } catch (err) {
        next(err);
    }
});

// edit task by id
router.put<{ id: string }, TaskResponse>("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const numId = parseInt(id);
        if (isNaN(numId) || numId < 0) {
            throw new Error("id is not a positive number");
        }
        const { content, is_done } = req.body;
        const task = await prisma.task.update({
            where: { id: numId },
            data: {
                content: content,
                is_done: is_done
            }
        });

        res.json({
            task: task,
            message: `task ${task.id} was updated successfully`
        });
    } catch (err) {
        next(err);
    }
});

// delete task by id
router.delete<{ id: string }, MessageResponse>("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const numId = parseInt(id);
        if (isNaN(numId) || numId < 0) {
            throw new Error("id is not a positive number");
        }
        const task = await prisma.task.delete({
            where: { id: numId }
        });

        res.json({
            message: `task ${task.id} was deleted successfully`
        });
    } catch (err) {
        next(err);
    }
});

export default router;
