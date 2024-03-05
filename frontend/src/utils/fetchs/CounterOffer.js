import secureFetch from "./SecureFetch";
import { HTTPMethods, routes } from "../constants";

export const CounterOffer = (userData) => {
    
    return secureFetch(
        `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.counteroffer}`,
        HTTPMethods.POST,
        JSON.stringify(userData), 
        {}
    );
}