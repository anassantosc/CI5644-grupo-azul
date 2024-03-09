import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages, alertTypes } from "../constants";

export const CreateOffer = async (offerData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}`;
    const method = HTTPMethods.POST;
    const data = JSON.stringify(offerData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.offer_success, alertTypes.success);
        } else if (response.status === statusCodes.bad_request) {
            showAlert(response.message, alertTypes.error);
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }

        return response;
    } catch (error) {
        console.error(error);
    }
};