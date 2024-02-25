import secureFetch from "./SecureFetch";
import httpMethods from "../constants/HTTPMethods";

export const EditUser = (userData) => {
    
    return secureFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/edit`, 
        httpMethods.POST, 
        JSON.stringify(userData), 
        {}
    );
}