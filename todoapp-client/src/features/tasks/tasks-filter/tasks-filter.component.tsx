import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTasks } from "../tasks.hooks";
import { TaskFilterByDoneValue, TaskOrderByDateValue } from "../tasks.types";
import "./tasks-filter.component.css";

export default function TasksFilter() {
    const tasksCtx = useTasks();

    function onSelectFilterByDoneValue(event: SelectChangeEvent) {
        const selectionValue = event.target.value as TaskFilterByDoneValue;
        tasksCtx?.setFilterByDoneValue(selectionValue);
    }

    function onSelectOrderByDateValue(event: SelectChangeEvent) {
        const selectionValue = event.target.value as TaskOrderByDateValue;
        tasksCtx?.setOrderByDateValue(selectionValue);
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filter-content" id="filter-header">
                <Typography>Filter Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", alignContent: "center", gap: "1rem" }}>
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel>Done</InputLabel>
                    <Select
                        id="selectTaskFilterByDoneValue"
                        value={`${tasksCtx?.filterByDoneValue}`}
                        label="Done"
                        onChange={onSelectFilterByDoneValue}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
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
                        <MenuItem value="oldest">Oldest</MenuItem>
                        <MenuItem value="newest">Newest</MenuItem>
                    </Select>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    );
}
