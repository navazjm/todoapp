import express from "express";
import taskRouter from "./tasks/tasks.routes";

const router = express.Router();

router.use("/tasks", taskRouter);

export default router;
