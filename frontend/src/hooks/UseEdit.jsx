import {useState, useEffect} from 'react';
import { EditUser } from '../utils/fetchs/EditUser';

export const useEdit = (id) => {
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
            const userData = await EditUser(id);
            setUser(userData);
        };

        fetchData();
    }, []);

    return user;
};
