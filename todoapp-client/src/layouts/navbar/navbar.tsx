import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100 shadow">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost normal-case text-xl">
                        Todo App
                    </NavLink>
                </div>
            </div>
        </>
    );
};
