import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import catchJWTCookie from "../../helpers/CatchJWTCookie";

const PersistSession = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = catchJWTCookie(document.cookie);
        try {
            const jwtObj = jwt_decode(jwtToken);
            setAuth({ username: jwtObj.sub });
            setIsLoading(false);
        } catch (err) {
            navigate("/", { state: { from: location }, replace: true });
        }
    }, []);
    return <>{isLoading ? <p> Loading ... </p> : <Outlet />}</>;
};

export default PersistSession;
