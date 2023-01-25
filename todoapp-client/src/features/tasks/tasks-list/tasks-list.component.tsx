import { Fragment, useEffect } from "react";
import { Divider } from "@mui/material";
import { useTasks } from "../tasks.hooks";
import { ITask } from "../tasks.types";
import TasksListItem from "./tasks-list-item/tasks-list-item.component";
import * as TodoAppAPI from "../tasks.api";
import "./tasks-list.component.css";

export default function TasksList() {
    const tasksCtx = useTasks();

    useEffect(() => {
        TodoAppAPI.getAll().then((tasks) => {
            tasks.sort((a, b) => {
                return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
            });
            tasksCtx?.setTasks(tasks);
        });
    }, []);

    function filterByDone(task: ITask): boolean {
        if (tasksCtx?.filterByDoneValue === "all") return true;
        if (tasksCtx?.filterByDoneValue === "incomplete" && !task.isDone) return true;
        if (tasksCtx?.filterByDoneValue === "completed" && task.isDone) return true;
        return false;
    }

    return (
        <>
            {tasksCtx?.tasks &&
                tasksCtx.tasks
                    .filter(
                        (task) => new Date(task.createdAt).toDateString() === tasksCtx.filterByDateValue.toDateString()
                    )
                    .filter(filterByDone)
                    .map((task) => (
                        <Fragment key={task.id}>
                            <TasksListItem task={task} />
                            <Divider />
                        </Fragment>
                    ))}
        </>
    );
}
