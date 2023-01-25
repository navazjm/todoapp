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
        if (tasksCtx?.filterByDoneValue === "no" && !task.isDone) return true;
        if (tasksCtx?.filterByDoneValue === "yes" && task.isDone) return true;
        return false;
    }

    function sortByTaskOrderByDateValue(task1: ITask, task2: ITask) {
        const task1DateValue = new Date(task1.updatedAt).valueOf();
        const task2DateValue = new Date(task2.updatedAt).valueOf();
        if (tasksCtx?.orderByDateValue === "oldest") {
            return task1DateValue - task2DateValue;
        }
        return task2DateValue - task1DateValue;
    }

    return (
        <>
            {tasksCtx?.tasks &&
                tasksCtx.tasks
                    .filter(
                        (task) => new Date(task.createdAt).toDateString() === tasksCtx.filterByDateValue.toDateString()
                    )
                    .filter(filterByDone)
                    .sort(sortByTaskOrderByDateValue)
                    .map((task) => (
                        <Fragment key={task.id}>
                            <TasksListItem task={task} />
                            <Divider />
                        </Fragment>
                    ))}
        </>
    );
}
