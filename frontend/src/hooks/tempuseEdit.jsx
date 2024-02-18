import {useState, useEffect} from 'react';
import { EditUser } from '../utils/fetchs/EditUser';

export const useEdit = () => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        password: '',
        name: '',
        email: '',
        gender: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const userData = await EditUser();
            setUser(userData);
        };

        fetchData();
    }, []);

    return user;
};
