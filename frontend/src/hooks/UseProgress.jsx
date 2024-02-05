import { useState, useEffect } from 'react';
import { GetProgress } from '../utils/fetchs/GetProgress';

export const useProgress = (id) => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const progressData = await GetProgress(id);
            setProgress(progressData);
        };

        fetchData();
    }, []);

    return progress;
}

