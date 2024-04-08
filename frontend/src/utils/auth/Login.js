import secureFetch from "../fetchs/SecureFetch";
import { HTTPMethods, alertMessages, alertTypes, routes, statusCodes } from "../constants";

export const Login = async (userData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.auth}${routes.login}`;
    const method = HTTPMethods.POST;
    const data = JSON.stringify(userData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.success_login, alertTypes.success);
        } else if (response.status === statusCodes.bad_request) {
            showAlert(alertMessages.user_not_found, alertTypes.warning);
        } else if (response.status === statusCodes.unauthorized) {
            showAlert(alertMessages.invalid_credentials, alertTypes.warning);
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }

        return response;
    } catch (error) {
        console.error(
            alertMessages.context_login_error,
            error
        );
    }
};
