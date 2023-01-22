import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export function notFound(err: Error, req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            res.status(404);
            throw new Error(`Task '${id}' not found`);
        }
    }
    next();
}
