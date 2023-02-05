import { AlertColor } from "@mui/material";

export interface IAlert {
    message: string;
    type: AlertColor | undefined;
    isOpen: boolean;
}
