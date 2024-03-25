import { useState, useEffect } from "react";
import { GetProgress } from "../utils/fetchs/GetProgress";

export const useProgress = () => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const progressData = await GetProgress();
            setProgress(progressData);
        };

        fetchData();
    }, []);

    return progress;
};
