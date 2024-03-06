import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const CreateCounterOffer = async (offerData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.counteroffer}`;
    const method = HTTPMethods.POST;
    const data = null;
    const headers = JSON.stringify(offerData);

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.counter_offer_success, alertTypes.success);
        } else {
            if (response.status === statusCodes.bad_request) showAlert(response.message, alertTypes.error);
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};