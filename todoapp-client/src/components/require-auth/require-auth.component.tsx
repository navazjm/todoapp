import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../common/auth/auth.hooks";

export default function RequireAuth() {
    const authCtx = useAuth();
    const location = useLocation();

    return authCtx?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
