import jwtDecode from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import catchJWTCookie from "../../utils/CatchJWTCookie";
const RequireAuth = ({ authRole }) => {
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
