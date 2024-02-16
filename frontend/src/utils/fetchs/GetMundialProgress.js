import secureFetch from "./SecureFetch";

export const GetMundialProgress = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/ownership/getMundialProgress`;
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const method = "GET";
    const data = null;
    const headers = {};

    const response = await secureFetch(url, method, data, headers);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const mundialProgress = await response.json();
    return mundialProgress;
};
