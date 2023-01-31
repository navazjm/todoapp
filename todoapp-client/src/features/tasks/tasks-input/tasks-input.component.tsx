import { useState } from "react";
import { FormControl, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
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

    function onSetDateFilterValue(event: React.ChangeEvent<HTMLInputElement>): void {
        // change date value from "yyyy-mm-dd" to "yyyy/mm/dd"
        const dateValueString = event.target.value.replaceAll("-", "/");
        tasksCtx?.setFilterByDateValue(new Date(dateValueString));
    }

    async function createNewTask(event: React.SyntheticEvent) {
        event.preventDefault();

        try {
            const assignedDate = tasksCtx?.filterByDateValue.toISOString() as string;
            const taskResp = await TodoAppAPI.createOne(taskContent, assignedDate);

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
            <FormControl sx={{ m: 1, width: { xs: "100%", md: "60%" }, margin: 0 }} variant="outlined">
                <TextField
                    label="Create task"
                    id="newTaskContentInput"
                    color="primary"
                    value={taskContent}
                    onChange={(evt) => setTaskContent(evt.target.value)}
                    InputProps={{
                        endAdornment: (
                            <Tooltip title="Submit">
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="create new task"
                                        onClick={createNewTask}
                                        edge="end"
                                        disabled={taskContent === ""}
                                        color="primary"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            </Tooltip>
                        )
                    }}
                    focused
                />
            </FormControl>
            <FormControl>
                <TextField
                    type="date"
                    value={tasksCtx?.filterByDateValue.toLocaleDateString("en-CA")}
                    onChange={onSetDateFilterValue}
                ></TextField>
            </FormControl>
        </form>
    );
}
