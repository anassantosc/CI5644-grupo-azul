import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages, statusCodes } from "../constants";

export const GetWishlist = async (dataList) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.ownership}${routes.wishlist}${routes.page(dataList.page)}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};
    if (dataList.id !== null && dataList.id !== undefined) {
        url += routes.offerId(dataList.id);
    }

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            if (response.status === statusCodes.bad_request) showAlert(await response.text(), alertTypes.error);
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
