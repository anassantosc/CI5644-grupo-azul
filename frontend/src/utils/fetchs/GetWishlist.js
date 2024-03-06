import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const GetWishlist = async (data) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.ownership}${routes.wishlist}${routes.page(data.page)}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};
    if (data.id !== null && data.id !== undefined) {
        url += routes.offerId(data.id);
    }

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            if (response.status === statusCodes.bad_request) showAlert(response.message, alertTypes.error);
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
