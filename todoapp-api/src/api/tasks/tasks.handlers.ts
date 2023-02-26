import { Response, Request, NextFunction } from "express";
import MessageResponse from "../../common/interfaces/responses/MessageResponse";
import { TaskResponse, TasksResponse } from "../../common/interfaces/responses/TasksReponse";
import prisma from "../../prisma";

export async function findAll(_: Request, res: Response<TasksResponse>, next: NextFunction) {
    try {
        const { user } = res.locals;
        const allTasks = await prisma.task.findMany({
            where: { authorId: user.id }
        });
        res.json({
            tasks: allTasks
        });
    } catch (err) {
        next(err);
    }
}

export async function findOneByID(_: Request, res: Response<TaskResponse>, next: NextFunction) {
    try {
        const { id, user } = res.locals;
        const foundTask = await prisma.task.findFirstOrThrow({
            where: { id: id }
        });
        if (foundTask?.authorId !== user.id) {
            res.sendStatus(403);
        }
        res.json({
            task: foundTask,
            message: `task ${foundTask.id} was found`
        });
    } catch (err) {
        next(err);
    }
}

export async function createOne(req: Request, res: Response<TaskResponse>, next: NextFunction) {
    try {
        const { user } = res.locals;
        const { content, assignedAt } = req.body;
        if (content === "") {
            res.status(422);
            throw new Error("Task content is required");
        }
        const task = await prisma.task.create({
            data: {
                content: content,
                assignedAt: assignedAt,
                authorId: user.id
            }
        });
        res.status(201).json({
            task: task,
            message: `task ${task.id} was created successfully`
        });
    } catch (err) {
        next(err);
    }
}

export async function updateOneByID(req: Request, res: Response<TaskResponse>, next: NextFunction) {
    try {
        const { id, user } = res.locals;
        const { content, isDone } = req.body;
        const foundTask = await prisma.task.findFirst({
            where: { id: id }
        });
        if (foundTask?.authorId !== user.id) {
            res.sendStatus(403);
        }
        const updatedTask = await prisma.task.update({
            where: { id: id },
            data: {
                content: content,
                isDone: isDone
            }
        });
        res.json({
            task: updatedTask,
            message: `task ${updatedTask.id} was updated successfully`
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteOneByID(req: Request, res: Response<MessageResponse>, next: NextFunction) {
    try {
        const { id, user } = res.locals;
        const foundTask = await prisma.task.findFirst({
            where: { id: id }
        });
        if (foundTask?.authorId !== user.id) {
            res.sendStatus(403);
        }

        const deletedTask = await prisma.task.delete({
            where: { id: id }
        });
        res.status(200).json({
            message: `task ${deletedTask.id} was deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}
