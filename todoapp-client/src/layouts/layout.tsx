import Navbar from "./navbar/navbar.component";
import Alert from "../components/alert/alert.component";
import { useAlert } from "../components/alert/alert.hooks";
import { Props } from "../utils/types";

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
