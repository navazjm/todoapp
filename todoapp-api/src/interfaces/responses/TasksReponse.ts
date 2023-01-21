import MessageResponse from "./MessageResponse";

interface Task {
    id: number;
    content: string;
    is_done: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskResponse extends MessageResponse {
    task: Task;
}

export interface TasksResponse {
    tasks: Task[];
}
