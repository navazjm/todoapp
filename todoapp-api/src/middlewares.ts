import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./common/constants";

import ErrorResponse from "./common/responses/ErrorResponse";

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
    });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") return res.sendStatus(403);
        res.locals.user = decoded.user;
        next();
    });
}
