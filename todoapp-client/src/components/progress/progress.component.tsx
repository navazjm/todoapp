import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./progress.component.css";

export default function ProgressComponent() {
    return (
        <>
            <Box sx={{ paddingTop: "1rem" }}>
                <CircularProgress />
            </Box>
        </>
    );
}
