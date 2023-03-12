import { AxiosInstance } from "axios";
import { IMessageResponse } from "../../common/types";
import { ITask, ITaskResp } from "./tasks.types";

export async function getAll(axios: AxiosInstance): Promise<ITask[]> {
    const resp = await axios.get("/tasks");
    const tasks: ITask[] = resp.data.tasks;
    return tasks;
}

export async function createOne(axios: AxiosInstance, taskContent: string, assignedDate: string): Promise<ITaskResp> {
    const resp = await axios.post("/tasks", {
        content: taskContent,
        assignedAt: assignedDate
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function updateOneByID(
    axios: AxiosInstance,
    taskID: number,
    content: string,
    isDone: boolean
): Promise<ITaskResp> {
    const resp = await axios.put(`/tasks/${taskID}`, {
        content: content,
        isDone: isDone
    });
    const taskResp: ITaskResp = resp.data;
    return taskResp;
}

export async function deleteOneByID(axios: AxiosInstance, taskID: number): Promise<IMessageResponse> {
    const resp = await axios.delete(`/tasks/${taskID}`);
    const messageResp: IMessageResponse = resp.data;
    return messageResp;
}
