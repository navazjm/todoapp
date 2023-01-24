import { AlertColor } from "@mui/material";

export interface IAlert {
    message: string;
    type: AlertColor | undefined;
    isOpen: boolean;
}

export interface IAlertContext {
    alert: IAlert;
    setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}
