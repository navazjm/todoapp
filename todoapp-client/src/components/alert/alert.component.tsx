import { Alert as MatAlert, Snackbar } from "@mui/material";
import { useAlert } from "./alert.hooks";
import "./alert.styles.css";

export default function Alert() {
    const alertCtx = useAlert();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        alertCtx?.setAlert({ ...alertCtx.alert, isOpen: false });
    };

    return (
        <Snackbar open={alertCtx?.alert.isOpen} autoHideDuration={6000} onClose={handleClose}>
            <MatAlert onClose={handleClose} severity={alertCtx?.alert.type} sx={{ width: "100%" }}>
                {alertCtx?.alert.message}
            </MatAlert>
        </Snackbar>
    );
}
