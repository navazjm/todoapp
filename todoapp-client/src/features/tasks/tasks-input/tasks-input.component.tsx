import { useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAlert } from "../../../components/alert/alert.hooks";
import { IAlert } from "../../../components/alert/alert.types";
import { useTasks } from "../tasks.hooks";
import { ITask } from "../tasks.types";
import * as TodoAppAPI from "../tasks.api";
import "./tasks-input.component.css";

export default function TasksInput() {
    const [taskContent, setTaskContent] = useState("");
    const tasksCtx = useTasks();
    const alertCtx = useAlert();

    async function createNewTask(event: React.SyntheticEvent) {
        event.preventDefault();

        try {
            const taskResp = await TodoAppAPI.createOne(taskContent);

            tasksCtx?.setTasks((tasks: ITask[]) => [...tasks, taskResp.task]);
            const newAlert: IAlert = {
                message: taskResp.message,
                type: "success",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        } catch (err) {
            const newAlert: IAlert = {
                message: "Failed to create new task",
                type: "error",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        }

        setTaskContent("");
    }

    return (
        <form onSubmit={(evt: React.SyntheticEvent) => createNewTask(evt)} className="tasks-input-form">
            <FormControl sx={{ m: 1, width: "25ch", margin: 0 }} variant="outlined">
                <InputLabel>Create task</InputLabel>
                <OutlinedInput
                    label="Create task"
                    id="new-task-content-input"
                    value={taskContent}
                    onChange={(evt) => setTaskContent(evt.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="create new task"
                                onClick={createNewTask}
                                edge="end"
                                disabled={taskContent === ""}
                            >
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>
    );
}
