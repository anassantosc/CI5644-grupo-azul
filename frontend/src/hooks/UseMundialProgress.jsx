import { useState, useEffect } from 'react';
import { GetMundialProgress } from '../utils/fetchs/GetMundialProgress';

export const useMundialProgress = () => {
    const [mundialProgress, setMundialProgress] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const mundialData = await GetMundialProgress();
            setMundialProgress(mundialData);
        };

        fetchData();
    }, []);

    return mundialProgress;
}