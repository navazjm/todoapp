import { ChangeEvent } from "react";
import { Checkbox, Typography } from "@mui/material";
import { ITask } from "../../tasks.types";
import { IAlert } from "../../../../components/alert/alert.types";
import { useAlert } from "../../../../components/alert/alert.hooks";
import { useTasks } from "../../tasks.hooks";
import { ITasksListBaseProps } from "../tasks-list.types";
import EditTaskContentInput from "../tasks-list-edit-task-content/tasks-list-edit-task-content.component";
import DeleteTask from "../tasks-list-delete-task/delete-task.component";
import * as TodoAppAPI from "../../tasks.api";
import "./tasks-list-item.component.css";

export default function TasksListItem({ task }: ITasksListBaseProps) {
    const alertCtx = useAlert();
    const tasksCtx = useTasks();

    async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>, taskToUpdate: ITask) {
        const isDoneChecked = event.target.checked;
        await updateTask(taskToUpdate.id, taskToUpdate.content, isDoneChecked);

        tasksCtx?.setTasks(
            tasksCtx.tasks.map((task) => {
                if (task.id === taskToUpdate.id) {
                    task.isDone = isDoneChecked;
                }
                return task;
            })
        );
    }

    async function updateTask(taskID: number, taskContent: string, taskIsDone: boolean) {
        try {
            const resp = await TodoAppAPI.updateOneByID(taskID, taskContent, taskIsDone);

            const newAlert: IAlert = {
                message: resp.message,
                type: "success",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);

            tasksCtx?.setTasks(
                tasksCtx?.tasks.map((task) => {
                    if (task.id === resp.task.id) {
                        task.content = resp.task.content;
                        task.isDone = resp.task.isDone;
                        task.createdAt = resp.task.createdAt;
                        task.updatedAt = resp.task.updatedAt;
                    }
                    return task;
                })
            );
        } catch (err) {
            const newAlert: IAlert = {
                message: "Failed to update task",
                type: "error",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        }
    }

    return (
        <div className="tasks-list-container">
            <div className="tasks-list-input-content">
                <Checkbox
                    aria-label={`task ${task.id} checkbox`}
                    checked={task.isDone}
                    onChange={(evt) => handleCheckboxChange(evt, task)}
                />
                {task.isDone ? (
                    <Typography
                        noWrap
                        component="p"
                        sx={{
                            paddingRight: "1rem",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "line-through",
                            width: "100%"
                        }}
                    >
                        {task.content}
                    </Typography>
                ) : (
                    <EditTaskContentInput task={task} updateTask={updateTask} />
                )}
            </div>
            <DeleteTask task={task} />
        </div>
    );
}
