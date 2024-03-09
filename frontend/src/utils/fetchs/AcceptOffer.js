import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const AcceptOffer = async (offerId) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.accept}`;
    const method = HTTPMethods.POST;
    const data = JSON.stringify({ offerId });
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};