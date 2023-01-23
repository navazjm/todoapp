import { Props } from "../utils/types";
import { Navbar } from "./navbar/navbar";

export const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};
