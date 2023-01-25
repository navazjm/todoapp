import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useTasks } from "../tasks.hooks";
import { TaskFilterByDoneValue } from "../tasks.types";
import "./tasks-filter.component.css";

export default function TasksFilter() {
    const tasksCtx = useTasks();

    function onSelectFilterByDoneValue(event: SelectChangeEvent) {
        const selectionValue = event.target.value as TaskFilterByDoneValue;
        tasksCtx?.setFilterByDoneValue(selectionValue);
    }

    function onSetDateFilterValue(event: React.ChangeEvent<HTMLInputElement>): void {
        tasksCtx?.setFilterByDateValue(new Date(event.target.value));
    }

    return (
        <div>
            <FormControl sx={{ minWidth: 130 }}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={`${tasksCtx?.filterByDoneValue}`}
                    label="Age"
                    onChange={onSelectFilterByDoneValue}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="incomplete">Incomplete</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <TextField
                type="date"
                value={tasksCtx?.filterByDateValue.toLocaleDateString("en-CA")}
                onChange={onSetDateFilterValue}
            ></TextField>
        </div>
    );
}
