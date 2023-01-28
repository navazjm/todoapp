import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { ITask, TaskFilterByDoneValue, TaskOrderByDateValue } from "./tasks.types";

interface ITasksContext {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    filteredTasks: ITask[];
    setFilteredTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    filterByDoneValue: TaskFilterByDoneValue;
    setFilterByDoneValue: React.Dispatch<React.SetStateAction<TaskFilterByDoneValue>>;
    filterByDateValue: Date;
    setFilterByDateValue: React.Dispatch<React.SetStateAction<Date>>;
    orderByDateValue: TaskOrderByDateValue;
    setOrderByDateValue: React.Dispatch<React.SetStateAction<TaskOrderByDateValue>>;
}

const TasksContext = createContext<ITasksContext | null>(null);

export const TasksProvider = ({ children }: Props) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const [filterByDone, setFilterByDone] = useState<TaskFilterByDoneValue>("all");
    const [filterByDate, setFilterByDate] = useState<Date>(new Date());
    const [orderByDate, setOrderByDate] = useState<TaskOrderByDateValue>("oldest");

    return (
        <TasksContext.Provider
            value={{
                tasks: tasks,
                setTasks: setTasks,
                filteredTasks: filteredTasks,
                setFilteredTasks: setFilteredTasks,
                filterByDoneValue: filterByDone,
                setFilterByDoneValue: setFilterByDone,
                filterByDateValue: filterByDate,
                setFilterByDateValue: setFilterByDate,
                orderByDateValue: orderByDate,
                setOrderByDateValue: setOrderByDate
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContext;
