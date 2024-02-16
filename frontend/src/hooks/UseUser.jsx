import {useState, useEffect} from 'react';
import {GetUser} from '../utils/fetchs/GetUser';

export const useUser = (id) => {
    const [user, setUser] = useState({
        id: null,
        username: null,
        password: null,
        name: null,
        email: null,
        gender: null
    });

    useEffect(() => {
        const fetchData = async () => {
            const userData = await GetUser(id);
            setUser(userData);
        };

        fetchData();
    }, []);

    return user;
};
