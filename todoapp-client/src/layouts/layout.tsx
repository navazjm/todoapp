import Alert from "../components/alert/alert.component";
import { useAlert } from "../components/alert/alert.hooks";
import { Props } from "../utils/types";
import { Navbar } from "./navbar/navbar";

export const Layout = ({ children }: Props) => {
    const alertCtx = useAlert();
    return (
        <>
            <Navbar />
            <main>{children}</main>
            {alertCtx?.alert && alertCtx.alert.message !== "" && <Alert />}
        </>
    );
};
