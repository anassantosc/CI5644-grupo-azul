import { useState, useEffect } from "react";
import { getCardsByPage } from "../utils/fetchs/GetCardsByPage";

export const useGetCards = (page) => {
    const [status, setStatus] = useState({
        cards: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCardsByPage(page);
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
