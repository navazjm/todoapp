import { createContext, useState } from "react";
import { Props } from "../../utils/types";
import { IProgressContext } from "./progress.types";

const ProgressContext = createContext<IProgressContext | null>(null);

export const ProgressProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <ProgressContext.Provider value={{ isLoading: isLoading, setIsLoading: setIsLoading }}>
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressContext;
