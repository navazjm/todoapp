import express from "express";

import MessageResponse from "../interfaces/responses/MessageResponse";

const router = express.Router();

router.get<{}, MessageResponse>("/", (_, res) => {
    res.json({
        message: "Hello Hello"
    });
});

export default router;
