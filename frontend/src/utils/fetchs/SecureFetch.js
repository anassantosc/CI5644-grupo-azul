import {defaultFetchConfig} from '../constants';

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
        credentials: defaultFetchConfig.credentials,
        headers: {
            ...defaultFetchConfig.headers,
            ...headers,
        },
    });
};

export default secureFetch;
