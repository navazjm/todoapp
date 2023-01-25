import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { ITask, TaskFilterByDoneValue } from "./tasks.types";

interface ITasksContext {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    filterByDoneValue: TaskFilterByDoneValue;
    setFilterByDoneValue: React.Dispatch<React.SetStateAction<TaskFilterByDoneValue>>;
    filterByDateValue: Date;
    setFilterByDateValue: React.Dispatch<React.SetStateAction<Date>>;
}

const TasksContext = createContext<ITasksContext | null>(null);

export const TasksProvider = ({ children }: Props) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filterByDone, setFilterByDone] = useState<TaskFilterByDoneValue>("all");
    const [filterByDate, setFilterByDate] = useState<Date>(new Date());

    return (
        <TasksContext.Provider
            value={{
                tasks: tasks,
                setTasks: setTasks,
                filterByDoneValue: filterByDone,
                setFilterByDoneValue: setFilterByDone,
                filterByDateValue: filterByDate,
                setFilterByDateValue: setFilterByDate
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContext;
