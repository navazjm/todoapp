import { IMessageResponse } from "../../utils/types";

export interface ITask {
    id: number;
    content: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITaskResp extends IMessageResponse {
    task: ITask;
}

export type TaskFilterByDoneValue = "all" | "incomplete" | "completed";
