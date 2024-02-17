import { useState, useEffect } from "react";
import { getCardsByPage } from "../utils/fetchs/getCardsByPage";

export const useGetCards = (id) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let page = 0;
                let hasNextPage = true;

                while (hasNextPage) {
                    const data = await getCardsByPage(page);
                    if (data.length > 0) {
                        setCards((prevCards) => [...prevCards, ...data]);
                        page++;
                    } else {
                        hasNextPage = false;
                    }
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { cards, loading, error };
};
