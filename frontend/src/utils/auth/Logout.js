import secureFetch from "../fetchs/SecureFetch";

export const Logout = async (showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
    const method = "GET";
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert("Sesión cerrada con éxito", "success");
        } else {
            showAlert("Ocurrió un error desconocido", "error");
        }
        return response;
    } catch (error) {
        console.error(
            "Contexto de error ocurrido durante inicio de sesión:",
            error
        );
    }
};
