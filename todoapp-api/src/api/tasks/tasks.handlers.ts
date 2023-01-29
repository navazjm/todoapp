import { Response, Request, NextFunction } from "express";
import MessageResponse from "../../interfaces/responses/MessageResponse";
import { TaskResponse, TasksResponse } from "../../interfaces/responses/TasksReponse";
import prisma from "../../prisma";

export async function findAll(_: Request, res: Response<TasksResponse>, next: NextFunction) {
    try {
        const allTasks = await prisma.task.findMany();
        res.json({
            tasks: allTasks
        });
    } catch (err) {
        next(err);
    }
}

export async function findOneByID(_: Request, res: Response<TaskResponse>, next: NextFunction) {
    try {
        const { id } = res.locals;
        const task = await prisma.task.findFirstOrThrow({
            where: { id: id }
        });
        res.json({
            task: task,
            message: `task ${task.id} was found`
        });
    } catch (err) {
        next(err);
    }
}

export async function createOne(req: Request, res: Response<TaskResponse>, next: NextFunction) {
    try {
        const { content, assignedAt } = req.body;
        if (content === "") {
            res.status(422);
            throw new Error("Task content is required");
        }
        const task = await prisma.task.create({
            data: {
                content: content,
                assignedAt: assignedAt
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
        const { id } = res.locals;
        const { content, isDone } = req.body;
        const task = await prisma.task.update({
            where: { id: id },
            data: {
                content: content,
                isDone: isDone
            }
        });
        res.json({
            task: task,
            message: `task ${task.id} was updated successfully`
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteOneByID(req: Request, res: Response<MessageResponse>, next: NextFunction) {
    try {
        const { id } = res.locals;
        const task = await prisma.task.delete({
            where: { id: id }
        });

        res.status(200).json({
            message: `task ${task.id} was deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}
