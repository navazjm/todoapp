import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserResponse } from "./users.types";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import prisma from "../../prisma";
import { ACCESS_TOKEN_SECRET, GOOGLE_CLIENT_ID, REFRESH_TOKEN_SECRET } from "../../common/constants";

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

        const accessToken = jwt.sign({ user: user }, ACCESS_TOKEN_SECRET, {
            expiresIn: "300s"
        });

        const refreshToken = jwt.sign({ user: user }, REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({
            token: accessToken,
            message: "user was logged in successfully"
        });
    } catch (err) {
        next(err);
    }
}

export function getAccessToken(req: Request, res: Response<UserResponse>, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt as string;

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") return res.sendStatus(403);

        try {
            const id = decoded.user.id as number;

            const user = await prisma.user.findFirst({
                where: { id: id }
            });

            const accessToken = jwt.sign({ user: user }, ACCESS_TOKEN_SECRET, {
                expiresIn: "300s"
            });

            res.status(201).json({
                token: accessToken,
                message: "Successfully generated a new access token"
            });
        } catch (err) {
            next(err);
        }
    });
}
