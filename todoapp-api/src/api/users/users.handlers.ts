import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserResponse } from "./users.types";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import prisma from "../../prisma";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string): Promise<TokenPayload | undefined> {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        return ticket.getPayload();
    } catch (error) {
        return undefined;
    }
}

export async function googleLogin(req: Request, res: Response<UserResponse>, next: NextFunction) {
    try {
        const token = req.body.token as string;
        if (token === "") {
            res.status(422);
            throw new Error("Google credential token is required");
        }

        const verificationResp = await verifyGoogleToken(token);
        if (!verificationResp) {
            res.status(422);
            throw new Error("Invalid Google credential token");
        }

        const email = verificationResp.email as string;
        const name = verificationResp.name as string;
        const picture = verificationResp.picture as string;

        const user = await prisma.user.upsert({
            where: { email: email },
            update: { name: name, picture: picture },
            create: { name: name, email: email, picture: picture }
        });

        const newToken = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "1d"
        });

        // TODO: store token in db

        res.status(201).json({
            token: newToken,
            message: "user was logged in successfully"
        });
    } catch (err) {
        next(err);
    }
}
