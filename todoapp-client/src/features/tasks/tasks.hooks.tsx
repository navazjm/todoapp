import { useContext } from "react";
import TasksContext from "./tasks.context";

export const useTasks = () => {
    return useContext(TasksContext);
};
