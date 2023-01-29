import axios from "../../lib/axios";
import { IMessageResponse } from "../../utils/types";
import { ITask, ITaskResp } from "./tasks.types";

export async function getAll(): Promise<ITask[]> {
    const resp = await axios.get("/v1/tasks");
    const tasks: ITask[] = resp.data.tasks;
    return tasks;
}

export async function createOne(taskContent: string): Promise<ITaskResp> {
    const resp = await axios.post("/v1/tasks", {
        content: taskContent
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function updateOneByID(taskID: number, content: string, isDone: boolean): Promise<ITaskResp> {
    const resp = await axios.put(`/v1/tasks/${taskID}`, {
        content: content,
        isDone: isDone
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function deleteOneByID(taskID: number): Promise<IMessageResponse> {
    const resp = await axios.delete(`/v1/tasks/${taskID}`);
    const messageResp: IMessageResponse = resp.data;
    return messageResp;
}
