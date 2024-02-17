import secureFetch from "./SecureFetch";

export const Authenticate = async (userData, authType) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${authType}`;
    const method = "POST";
    const data = JSON.stringify(userData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(
                `Failed to authenticate. HTTP error! status: ${response.status}`
            );
        }

        return response;
    } catch (error) {
        console.error("Error occurred during authentication:", error);
    }
};

export const Logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
    const method = "GET";
    const data = "";
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (!response.ok) {
            throw new Error(
                `Failed to logout. HTTP error! status: ${response.status}`
            );
        }

        return await response;
    } catch (error) {
        console.error("Error occurred during logout:", error);
    }
};
