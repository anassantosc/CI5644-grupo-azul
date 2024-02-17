/**
 * Fetch that ensures that the cookies are sent and received
 * to and from the server.
 *
 * @returns Fetch resulting promise
 * */
const secureFetch = (url, method, data, headers) => {
    return fetch(url, {
        method: method.toUpperCase(),
        body: data,
        credentials: "same-origin", // changed from "include" 
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    });
}

export default secureFetch;