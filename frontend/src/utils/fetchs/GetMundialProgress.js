import secureFetch from './SecureFetch';

export const GetMundialProgress = async () => {
    const url = `http://localhost:8080/api/ownership/getMundialProgress`;
    const method = "GET";
    const data = null;
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const mundialProgress = await response.json();
    return mundialProgress;
}