import { createContext, useState } from "react";
import { Props } from "../../utils/types";

export interface IProgressContext {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

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
