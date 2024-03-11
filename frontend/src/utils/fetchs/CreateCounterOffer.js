import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages, alertTypes, statusCodes } from "../constants";

export const CreateCounterOffer = async (offerData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.counteroffer}`;
    const method = HTTPMethods.PUT;
    const data = JSON.stringify(offerData);
    const headers = {};
    console.log(method);

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.offer_success, alertTypes.success);
        } else if (response.status === statusCodes.bad_request) {
            showAlert(await response.text(), alertTypes.error);
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }

        return response;
    } catch (error) {
        console.error(error);
    }
};