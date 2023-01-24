import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { IAlert, IAlertContext } from "./alert.types";

const AlertContext = createContext<IAlertContext | null>(null);

export const AlertProvider = ({ children }: Props) => {
    const [alert, setAlert] = useState<IAlert>({
        message: "",
        type: undefined,
        isOpen: false
    });

    return <AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
