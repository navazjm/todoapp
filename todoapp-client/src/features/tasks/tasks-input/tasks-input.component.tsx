import { useState } from "react";
import filter from "leo-profanity";
import { FormControl, FormHelperText, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAlert } from "../../../components/alert/alert.hooks";
import { IAlert } from "../../../components/alert/alert.types";
import { useProgress } from "../../../components/progress/progress.hooks";
import { useTasks } from "../tasks.hooks";
import { ITask } from "../tasks.types";
import * as TodoAppAPI from "../tasks.api";
import "./tasks-input.component.css";

export default function TasksInput() {
    const [taskContent, setTaskContent] = useState("");
    const [taskContentError, setTaskContentError] = useState({
        containsError: false,
        message: ""
    });
    const tasksCtx = useTasks();
    const alertCtx = useAlert();
    const progressCtx = useProgress();

    function onChangeTaskContent(event: React.ChangeEvent<HTMLInputElement>): void {
        setTaskContent(event.target.value);
    }

    function onSetDateFilterValue(event: React.ChangeEvent<HTMLInputElement>): void {
        // change date value from "yyyy-mm-dd" to "yyyy/mm/dd"
        const dateValueString = event.target.value.replaceAll("-", "/");
        tasksCtx?.setFilterByDateValue(new Date(dateValueString));
    }

    async function createNewTask(event: React.SyntheticEvent) {
        event.preventDefault();

        if (taskContent === "") {
            setTaskContentError({
                containsError: true,
                message: "Task content is required"
            });
            return;
        }

        if (filter.check(taskContent)) {
            setTaskContentError({
                containsError: true,
                message: "Watch your profanity"
            });
            return;
        }

        progressCtx?.setIsLoading(true);
        setTaskContentError({ containsError: false, message: "" });

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
        progressCtx?.setIsLoading(false);
    }

    return (
        <form onSubmit={(evt: React.SyntheticEvent) => createNewTask(evt)} className="tasks-input-form">
            <FormControl sx={{ m: 1, width: { xs: "100%", md: "60%" }, margin: 0 }} variant="outlined">
                <TextField
                    label="Create task"
                    id="newTaskContentInput"
                    color="primary"
                    value={taskContent}
                    onChange={onChangeTaskContent}
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
                    error={taskContentError.containsError}
                />
                {taskContentError && (
                    <FormHelperText sx={{ marginLeft: 0, color: "red" }}>{taskContentError.message}</FormHelperText>
                )}
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
