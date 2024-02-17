import secureFetch from "./SecureFetch";

export const getCardsByPage = async (page) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/ownership/get-cards/${page}`;
    const method = "GET";
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }

    return await response.json();
};
