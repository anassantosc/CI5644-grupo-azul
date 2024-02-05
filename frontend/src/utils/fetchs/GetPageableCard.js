import secureFetch from './SecureFetch';

export const getPageableCard = async (id, page) => {
    const url = `http://localhost:8080/api/ownership/GetPageableCard?id=${id}&page=${page}`;
    const method = 'GET';
    const data = null;
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cards = await response.json();
    return cards;
}