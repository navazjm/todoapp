import { useAlert } from "../components/alert/alert.hooks";
import { Props } from "../utils/types";
import Alert from "../components/alert/alert.component";
import Navbar from "./navbar/navbar.component";
import "./layout.component.css";

export const Layout = ({ children }: Props) => {
    const alertCtx = useAlert();
    return (
        <>
            <Navbar />
            <main className="layout-main-container">{children}</main>
            {alertCtx?.alert && alertCtx.alert.message !== "" && <Alert />}
        </>
    );
};
