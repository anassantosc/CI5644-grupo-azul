import secureFetch from "./SecureFetch";

export const Authenticate = async (userData, authType) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${authType}`;
    const method = "POST";
    const data = JSON.stringify(userData);
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (authType === "login") {
        return await response.json();
    }
};

export const Logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/url/auth/logout`;
    const method = "GET";
    const data = "";
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};
