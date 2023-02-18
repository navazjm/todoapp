import { useAlert } from "../components/alert/alert.hooks";
import { Props } from "../common/types";
import AlertComponent from "../components/alert/alert.component";
import NavbarComponent from "./navbar/navbar.component";
import "./layout.component.css";

export const Layout = ({ children }: Props) => {
    const alertCtx = useAlert();
    return (
        <>
            <NavbarComponent />
            <main className="layout-main-container">{children}</main>
            {alertCtx?.alert && alertCtx.alert.message !== "" && <AlertComponent />}
        </>
    );
};
