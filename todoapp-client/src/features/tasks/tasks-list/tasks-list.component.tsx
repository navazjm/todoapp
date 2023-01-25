import { Fragment, useEffect } from "react";
import { Divider } from "@mui/material";
import { useTasks } from "../tasks.hooks";
import {
    ITask,
    TASKFILTERBYDONE_ALL,
    TASKFILTERBYDONE_NO,
    TASKFILTERBYDONE_YES,
    TASKORDERBYDATE_OLDEST
} from "../tasks.types";
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
        if (tasksCtx?.filterByDoneValue === TASKFILTERBYDONE_ALL) return true;
        if (tasksCtx?.filterByDoneValue === TASKFILTERBYDONE_NO && !task.isDone) return true;
        if (tasksCtx?.filterByDoneValue === TASKFILTERBYDONE_YES && task.isDone) return true;
        return false;
    }

    function sortByTaskOrderByDateValue(task1: ITask, task2: ITask) {
        const task1CreatedAtDateValue = new Date(task1.createdAt).valueOf();
        const task2CreatedAtDateValue = new Date(task2.createdAt).valueOf();
        if (tasksCtx?.orderByDateValue === TASKORDERBYDATE_OLDEST) {
            return task1CreatedAtDateValue - task2CreatedAtDateValue;
        }

        return task2CreatedAtDateValue - task1CreatedAtDateValue;
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
