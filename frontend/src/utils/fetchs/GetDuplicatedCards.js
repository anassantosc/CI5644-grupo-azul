import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const GetDuplicatedCards = async (page) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.ownership}${routes.duplicated}${routes.page(page)}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};

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
