import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const EditUser = async (userData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.users}`;
    const method = HTTPMethods.POST;
    const data = null;
    const headers = JSON.stringify(userData);

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

