import { useState, useEffect } from "react";
import { getCardsByPage } from "../utils/fetchs/getCardsByPage";

export const useGetCards = (page) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCardsByPage(page);
                if (data.length > 0) {
                    setCards(data);
                    page++;
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return { cards, loading, error };
};
