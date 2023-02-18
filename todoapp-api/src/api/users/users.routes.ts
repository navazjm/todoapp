import express from "express";
import * as UsersHandlers from "./users.handlers";

const router = express.Router();

router.post("/google/login", UsersHandlers.googleLogin);

export default router;
