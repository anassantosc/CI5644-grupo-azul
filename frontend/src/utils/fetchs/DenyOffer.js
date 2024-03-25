import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages, alertTypes, statusCodes} from "../constants";

export const DenyOffer = async (offerId, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.deny}`;
    const method = HTTPMethods.POST;
    const data = JSON.stringify({ offerId });
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if(response.ok) {
            showAlert(alertMessages.deny_trade, alertTypes.warning)
        } else if (response.status === statusCodes.bad_request) {
            showAlert(response.message, alertTypes.error)
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};