import secureFetch from './SecureFetch';
import { HTTPMethods, routes,alertTypes, alertMessages, statusCodes } from '../constants';

export const GetPurchasedCards = async (quantity,showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.purchase}${routes.quantity(quantity)}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};
    const showBackAlert = (message, type) => {
        console.log(`${type}: ${message}`)
    }


    try {
        const response = await secureFetch(url, method, data, headers);
        if (!response.ok) {
            if (response.status === statusCodes.bad_request) {
                showBackAlert(await response.text(), alertTypes.error);
                
            }
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        console.log(response)
        return await response.json();
        
    } catch (error) {
        showAlert(alertMessages.credit_card_not_found, alertTypes.error);
    }
};
