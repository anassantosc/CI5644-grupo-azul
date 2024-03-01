import secureFetch from "../fetchs/SecureFetch";

export const Login = async (userData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    const method = "POST";
    const data = JSON.stringify(userData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert("Inicio de sesión exitoso", "success");
        } else if (response.status === 409) {
            showAlert("Usuario no encontrado", "warning");
        } else if (response.status === 401) {
            showAlert("Credenciales inválidas", "warning");
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
