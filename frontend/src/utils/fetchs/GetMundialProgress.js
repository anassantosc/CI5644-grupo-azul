import secureFetch from "./SecureFetch";
import { HTTPMethods, routes, alertMessages } from "../constants";


export const GetMundialProgress = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.ownership}${routes.getMundialProgress}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(`${alertMessages.http_error} ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
