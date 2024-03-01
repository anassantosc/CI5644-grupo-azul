import secureFetch from "./SecureFetch";
import httpMethods from "../constants/HTTPMethods";

export const CreateOffer = (userData) => {
    
    return secureFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/offer/create`, 
        httpMethods.POST, 
        JSON.stringify(userData), 
        {}
    );
}