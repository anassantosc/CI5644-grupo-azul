import secureFetch from "./SecureFetch";
import { HTTPMethods, routes } from "../constants";

export const CreateOffer = (offerData) => {
    
    return secureFetch(
        `${process.env.NEXT_PUBLIC_API_URL}${routes.api}${routes.offer}${routes.create}`,
        HTTPMethods.POST,
        JSON.stringify(offerData), 
        {}
    );
}