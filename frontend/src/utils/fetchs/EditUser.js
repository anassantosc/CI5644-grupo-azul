import secureFetch from "./SecureFetch";
import { HTTPMethods, routes } from "../constants";

export const EditUser = (userData) => {
    return secureFetch(
        `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.user}${routes.edit}`,
        HTTPMethods.POST,
        JSON.stringify(userData), 
        {}
    );
}