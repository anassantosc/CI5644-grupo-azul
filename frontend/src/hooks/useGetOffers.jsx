import {useState, useEffect} from 'react';
import {GetOffers} from '../utils/fetchs/GetOffers';

export const useGetOffers = (page) => {
    const [status, setStatus] = useState({
        offers: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetOffers(page);
                if (data.length > 0) {
                    setStatus(prevState => ({
                        ...prevState,
                        offers: data
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
}