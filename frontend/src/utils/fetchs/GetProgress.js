import secureFetch from './SecureFetch';

export const GetProgress = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/ownership/getProgress?id=${id}`;
    const method = 'GET';
    const data = null;
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const progress = await response.json();
    return progress;
}