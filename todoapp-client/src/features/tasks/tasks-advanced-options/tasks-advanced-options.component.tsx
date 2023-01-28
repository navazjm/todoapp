import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTasks } from "../tasks.hooks";
import {
    ITask,
    TaskFilterByDoneValue,
    TASKFILTERBYDONE_ALL,
    TASKFILTERBYDONE_NO,
    TASKFILTERBYDONE_YES,
    TaskOrderByDateValue,
    TASKORDERBYDATE_NEWEST,
    TASKORDERBYDATE_OLDEST
} from "../tasks.types";
import * as TodoAppAPI from "../tasks.api";
import "./tasks-advanced-options.component.css";
import { IAlert } from "../../../components/alert/alert.types";
import { useAlert } from "../../../components/alert/alert.hooks";

export default function TasksAdvancedOptions() {
    const tasksCtx = useTasks();
    const alertCtx = useAlert();

    function onSelectFilterByDoneValue(event: SelectChangeEvent) {
        const selectionValue = event.target.value as TaskFilterByDoneValue;
        tasksCtx?.setFilterByDoneValue(selectionValue);
    }

    function onSelectOrderByDateValue(event: SelectChangeEvent) {
        const selectionValue = event.target.value as TaskOrderByDateValue;
        tasksCtx?.setOrderByDateValue(selectionValue);
    }

    async function onClickDeleteAll(event: React.SyntheticEvent) {
        event.preventDefault();
        try {
            const dateValue = tasksCtx?.filterByDateValue.toISOString() as string;
            const taskResp = await TodoAppAPI.deleteAllByDate(dateValue);

            tasksCtx?.setTasks(
                tasksCtx.tasks.filter((task: ITask) => {
                    new Date(task.createdAt).toDateString() !== tasksCtx.filterByDateValue.toDateString();
                })
            );
            const newAlert: IAlert = {
                message: taskResp.message,
                type: "success",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        } catch (err) {
            const newAlert: IAlert = {
                message: "Failed to delete all tasks by filtered date",
                type: "error",
                isOpen: true
            };
            alertCtx?.setAlert(newAlert);
        }
    }

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filter-content" id="filter-header">
                    <Typography>Advanced Options</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ display: "flex", alignContent: "center", gap: "1rem", justifyContent: "space-between" }}
                >
                    <div className="tasks-advanced-options-group">
                        <Typography sx={{ fontWeight: 200 }}>Filters</Typography>
                        <div className="tasks-advanced-options-group-items">
                            <FormControl sx={{ minWidth: 100 }}>
                                <InputLabel>Done</InputLabel>
                                <Select
                                    id="selectTaskFilterByDoneValue"
                                    value={`${tasksCtx?.filterByDoneValue}`}
                                    label="Done"
                                    onChange={onSelectFilterByDoneValue}
                                >
                                    <MenuItem value={TASKFILTERBYDONE_ALL}>All</MenuItem>
                                    <MenuItem value={TASKFILTERBYDONE_YES}>Yes</MenuItem>
                                    <MenuItem value={TASKFILTERBYDONE_NO}>No</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 100 }}>
                                <InputLabel>Order by</InputLabel>
                                <Select
                                    id="selectTaskOrderByDateValue"
                                    value={`${tasksCtx?.orderByDateValue}`}
                                    label="Order by"
                                    onChange={onSelectOrderByDateValue}
                                >
                                    <MenuItem value={TASKORDERBYDATE_OLDEST}>Oldest</MenuItem>
                                    <MenuItem value={TASKORDERBYDATE_NEWEST}>Newest</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="tasks-advanced-options-group">
                        <Typography sx={{ fontWeight: 200 }}>Actions</Typography>
                        <div className="tasks-advanced-options-group-items">
                            <Tooltip title="Delete all tasks for the selected date">
                                <span>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ padding: "16.5px 14px" }}
                                        disabled={tasksCtx?.filteredTasks && tasksCtx?.filteredTasks.length == 0}
                                        onClick={onClickDeleteAll}
                                    >
                                        Delete All
                                    </Button>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Divider />
        </>
    );
}
