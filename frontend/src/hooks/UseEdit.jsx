import {useState, useEffect} from 'react';
import { EditUser } from '../utils/fetchs/EditUser';

export const useEdit = (id) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await EditUser(id);
            setUser(userData);
        };

        fetchData();
    }, []);

    return user;
}