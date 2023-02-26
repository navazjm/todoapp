import { Task } from "@prisma/client";
import MessageResponse from "./MessageResponse";

export interface TaskResponse extends MessageResponse {
    task: Task;
}

export interface TasksResponse {
    tasks: Task[];
}
