import secureFetch from "./SecureFetch";

export const EditUser = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/edit`;
    const method = "POST";
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error occurred during edition:", error);
    }
};
