import secureFetch from "./SecureFetch";

export const GetUser = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/detail`;
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
