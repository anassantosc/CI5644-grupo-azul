import { useState, useEffect } from 'react';
import { GetMundialProgress } from '../utils/fetchs/GetMundialProgress';

export const useMundialProgress = (isLogin) => {
    const [mundialProgress, setMundialProgress] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const mundialData = isLogin ? await GetMundialProgress() : null;
            setMundialProgress(mundialData);
        };

        fetchData();
    }, [isLogin]);

    return mundialProgress;
}