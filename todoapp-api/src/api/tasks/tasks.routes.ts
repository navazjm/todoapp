import express from "express";
import * as TasksHandlers from "./tasks.handlers";

const router = express.Router();

router.get("/", TasksHandlers.findAll);
router.get("/:id", TasksHandlers.findOneByID);
router.post("/", TasksHandlers.createOne);
router.put("/:id", TasksHandlers.updateOneByID);
router.delete("/:id", TasksHandlers.deleteOneByID);

export default router;
