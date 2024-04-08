import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuthentication = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const jwtToken = Cookies.get("JWT");
        setIsLogin(!!jwtToken);
    }, []);

    return isLogin;
};
