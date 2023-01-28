import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export function validateID(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const numId = parseInt(id);
        if (isNaN(numId) || numId < 0) {
            res.status(404);
            throw new Error("id is not a positive number");
        }
        res.locals.id = numId;
        next();
    } catch (err) {
        next(err);
    }
}

export function notFound(err: Error, _: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            res.status(404);
            throw new Error(`Task '${id}' not found`);
        }
        throw new Error(`Task error`);
    }
    next();
}
