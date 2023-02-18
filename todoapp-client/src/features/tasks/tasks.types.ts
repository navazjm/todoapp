import { IMessageResponse } from "../../common/types";

export interface ITask {
    id: number;
    content: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
    assignedAt: Date;
}

export interface ITaskResp extends IMessageResponse {
    task: ITask;
}

export const TASKFILTERBYDONE_ALL = "all";
export const TASKFILTERBYDONE_YES = "yes";
export const TASKFILTERBYDONE_NO = "no";
export type TaskFilterByDoneValue =
    | typeof TASKFILTERBYDONE_ALL
    | typeof TASKFILTERBYDONE_YES
    | typeof TASKFILTERBYDONE_NO;

export const TASKORDERBYDATE_OLDEST = "oldest";
export const TASKORDERBYDATE_NEWEST = "newest";
export type TaskOrderByDateValue = typeof TASKORDERBYDATE_OLDEST | typeof TASKORDERBYDATE_NEWEST;
