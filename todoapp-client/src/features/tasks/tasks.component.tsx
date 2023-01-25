import { Card, CardContent, Container, Divider } from "@mui/material";
import TasksFilter from "./tasks-filter/tasks-filter.component";
import TasksInput from "./tasks-input/tasks-input.component";
import TasksList from "./tasks-list/tasks-list.component";
import "./tasks.component.css";

export default function TasksComponent() {
    return (
        <>
            <Container
                sx={{
                    marginTop: "5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100vw"
                }}
            >
                <Card sx={{ minWidth: 350, width: 600, maxHeight: 600, overflowY: "auto" }}>
                    <CardContent sx={{ paddingTop: 0 }}>
                        <div className="tasks-card-content-header">
                            <TasksInput />
                            <TasksFilter />
                        </div>
                        <Divider />
                        <TasksList />
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
