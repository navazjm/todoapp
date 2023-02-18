import { createContext, useState } from "react";
import { Props } from "../types";
import { IToken, IUser } from "./auth.types";

interface IAuthContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    token: IToken | null;
    setToken: React.Dispatch<React.SetStateAction<IToken | null>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<IToken | null>(null);

    return (
        <AuthContext.Provider
            value={{
                user: user,
                setUser: setUser,
                token: token,
                setToken: setToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
