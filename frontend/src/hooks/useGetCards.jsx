import { useState, useEffect } from "react";
import { GetCards } from "../utils/fetchs/GetCards";

export const useGetCards = (page) => {
    const [status, setStatus] = useState({
        cards: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetCards(page);
                if (data.length > 0) {
                    setStatus(prevState => ({
                        ...prevState,
                        cards: data
                    }));
                    page++;
                }
                setStatus(prevState => ({
                    ...prevState,
                    loading: false
                }));
            } catch (error) {
                setStatus(prevState => ({
                    ...prevState,
                    error: error,
                    loading: false
                }));
            }
        };

        fetchData();
    }, [page]);

    return status;
};
