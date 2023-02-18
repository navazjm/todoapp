import axios from "../../lib/axios";
import { IMessageResponse } from "../../common/types";
import { ITask, ITaskResp } from "./tasks.types";

export async function getAll(): Promise<ITask[]> {
    const resp = await axios.get("/tasks");
    const tasks: ITask[] = resp.data.tasks;
    return tasks;
}

export async function createOne(taskContent: string, assignedDate: string): Promise<ITaskResp> {
    const resp = await axios.post("/tasks", {
        content: taskContent,
        assignedAt: assignedDate
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function updateOneByID(taskID: number, content: string, isDone: boolean): Promise<ITaskResp> {
    const resp = await axios.put(`/tasks/${taskID}`, {
        content: content,
        isDone: isDone
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function deleteOneByID(taskID: number): Promise<IMessageResponse> {
    const resp = await axios.delete(`/tasks/${taskID}`);
    const messageResp: IMessageResponse = resp.data;
    return messageResp;
}
