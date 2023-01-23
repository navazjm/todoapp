import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { ITask, ITasksContext } from "./tasks.types";

const TasksContext = createContext<ITasksContext | null>(null);

export const TasksProvider = ({ children }: Props) => {
    const [tasks, setTasks] = useState<ITask[] | null>(null);

    return <TasksContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>{children}</TasksContext.Provider>;
};

export default TasksContext;
