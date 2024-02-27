import secureFetch from "../fetchs/SecureFetch";

export const Register = async (userData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
    const method = "POST";
    const data = JSON.stringify(userData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert("Registro exitoso", "success");
        } else if (response.status === 409) {
            showAlert(
                "Usuario existente, intente con uno diferente",
                "warning"
            );
        } else {
            showAlert("Ocurrió un error desconocido", "error");
        }
        return response;
    } catch (error) {
        console.error("Contexto de error ocurrido durante registro:", error);
    }
};
