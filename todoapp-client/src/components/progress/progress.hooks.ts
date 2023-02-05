import { useContext } from "react";
import ProgressContext from "./progress.context";

export const useProgress = () => {
    return useContext(ProgressContext);
};
