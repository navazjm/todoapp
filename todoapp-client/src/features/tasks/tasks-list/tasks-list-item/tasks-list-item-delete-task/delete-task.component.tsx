import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAlert } from "../../../../../components/alert/alert.types";
import { useAlert } from "../../../../../components/alert/alert.hooks";
import { useTasks } from "../../../tasks.hooks";
import { ITasksListBaseProps } from "../../tasks-list.types";
import * as TodoAppAPI from "../../../tasks.api";
import "./delete-task.component.css";

export default function DeleteTask({ task }: ITasksListBaseProps) {
    const alertCtx = useAlert();
    const tasksCtx = useTasks();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onDeleteTask(taskID: number) {
        try {
            const resp = await TodoAppAPI.deleteOneByID(taskID);
            const newAlert: IAlert = {
                message: resp.message,
                type: "success",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
            tasksCtx?.setTasks(tasksCtx.tasks.filter((task) => task.id !== taskID));
            setOpen(false);
        } catch (err) {
            const newAlert: IAlert = {
                message: "Failed to delete task",
                type: "error",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        }
    }

    return (
        <>
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete task</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete task '${task.content}'?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => onDeleteTask(task.id)} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
