import { useContext } from "react";
import AlertContext from "./alert.context";

export const useAlert = () => {
    return useContext(AlertContext);
};
