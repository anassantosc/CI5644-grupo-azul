import secureFetch from "../fetchs/SecureFetch";
import { HTTPMethods, alertMessages, alertTypes, routes } from "../constants";

export const Logout = async (showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.auth}${routes.logout}`;
    const method = HTTPMethods.GET;
    const data = null;
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.success_logout, alertTypes.success);
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }
        return response;
    } catch (error) {
        console.error(
            alertMessages.context_logout_error,
            error
        );
    }
};
