import secureFetch from './SecureFetch';

export const GetUser = async (id) => {
    const url = `http://localhost:8080/api/user/detail?id=${id}`;
    const method = 'GET';
    const data = null;
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
}