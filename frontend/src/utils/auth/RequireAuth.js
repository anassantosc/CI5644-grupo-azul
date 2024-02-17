import { useLocation, Navigate, Outlet } from "react-router-dom";
import catchJWTCookie from "../../utils/CatchJWTCookie";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
const RequireAuth = ({ authRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const jwtTok = catchJWTCookie(document.cookie);
    try {
        jwtDecode(jwtTok);
        return jwtTok ? (
            <Outlet />
        ) : (
            <Navigate to="/" state={{ from: location }} replace />
        );
    } catch (e) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
