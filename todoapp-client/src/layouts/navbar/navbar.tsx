import { NavLink } from "react-router-dom";
import TodoappLogo from "../../assets/todoapp-logo.png";

export const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100 shadow">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost normal-case text-xl">
                        <label className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={TodoappLogo} />
                            </div>
                        </label>
                        Todo App
                    </NavLink>
                </div>
            </div>
        </>
    );
};
