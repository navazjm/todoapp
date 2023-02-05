import { Card, CardContent, Container, Divider } from "@mui/material";
import ProgressComponent from "../../components/progress/progress.component";
import { useProgress } from "../../components/progress/progress.hooks";
import TasksFilter from "./tasks-filter/tasks-filter.component";
import TasksInput from "./tasks-input/tasks-input.component";
import TasksList from "./tasks-list/tasks-list.component";
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
                            <ProgressComponent />
                        ) : (
                            <>
                                <div className="tasks-card-content-header">
                                    <TasksInput />
                                    <TasksFilter />
                                </div>
                                <Divider />
                                <TasksList />
                            </>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
