import express from "express";
import taskRouter from "./tasks";

import MessageResponse from "../interfaces/responses/MessageResponse";

const router = express.Router();

router.get<{}, MessageResponse>("/", (_, res) => {
    res.json({
        message: "Hello Hello"
    });
});

router.use("/tasks", taskRouter);

export default router;
