import express from "express";
import taskRouter from "./tasks/tasks.routes";
import userRouter from "./users/users.routes";

const router = express.Router();

router.use("/tasks", taskRouter);
router.use("/users", userRouter);

export default router;
