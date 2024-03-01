import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";

export const GetUser = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.user}${routes.detail}`;
    const method = "GET";
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error(error);
    }
};
