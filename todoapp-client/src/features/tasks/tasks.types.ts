export interface ITask {
    id: number;
    content: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITasksContext {
    tasks: ITask[] | null;
    setTasks: React.Dispatch<React.SetStateAction<ITask[] | null>>;
}
