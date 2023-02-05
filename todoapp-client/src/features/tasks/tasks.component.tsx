import { Box, Card, CardContent, Container, Divider } from "@mui/material";
import { useProgress } from "../../components/progress/progress.hooks";
import ProgressComponent from "../../components/progress/progress.component";
import TasksFilterComponent from "./tasks-filter/tasks-filter.component";
import TasksInputComponent from "./tasks-input/tasks-input.component";
import TasksListComponent from "./tasks-list/tasks-list.component";
import "./tasks.component.css";

export default function TasksComponent() {
    const progressCtx = useProgress();
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
                <Card sx={{ minWidth: 350, width: 600, minHeight: 600, maxHeight: 600, overflowY: "auto" }}>
                    <CardContent sx={{ paddingTop: 0, position: "relative" }}>
                        {progressCtx?.isLoading ? (
                            <Box sx={{ paddingTop: "1rem" }}>
                                <ProgressComponent />
                            </Box>
                        ) : (
                            <>
                                <div className="tasks-card-content-header">
                                    <TasksInputComponent />
                                    <TasksFilterComponent />
                                </div>
                                <Divider />
                                <TasksListComponent />
                            </>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
