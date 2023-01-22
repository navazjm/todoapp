import express from "express";
import * as TasksHandlers from "./tasks.handlers";
import * as TasksMiddlewares from "./tasks.middlewares";

const router = express.Router();

router.get("/", TasksHandlers.findAll);
router.get("/:id", TasksHandlers.findOneByID, TasksMiddlewares.notFound);
router.post("/", TasksHandlers.createOne);
router.put("/:id", TasksHandlers.updateOneByID, TasksMiddlewares.notFound);
router.delete("/:id", TasksHandlers.deleteOneByID, TasksMiddlewares.notFound);

export default router;
