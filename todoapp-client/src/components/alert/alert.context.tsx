import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { IAlert } from "./alert.types";

interface IAlertContext {
    alert: IAlert;
    setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}

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
