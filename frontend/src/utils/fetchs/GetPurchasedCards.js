import secureFetch from './SecureFetch';
import { HTTPMethods, routes, alertMessages } from '../constants';

export const GetPurchasedCards = async (quantity) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.purchase}?quantity=${quantity}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
