import secureFetch from "../fetchs/SecureFetch";
import { HTTPMethods, routes, alertMessages, alertTypes, statusCodes } from "../constants";

export const Register = async (userData, showAlert) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${routes.auth}${routes.register}`;
    const method = HTTPMethods.POST;
    const data = JSON.stringify(userData);
    const headers = {};

    try {
        const response = await secureFetch(url, method, data, headers);

        if (response.ok) {
            showAlert(alertMessages.success_register, alertTypes.success);
        } else if (response.status === statusCodes.bad_request) {
            showAlert(alertMessages.user_already_exists, alertTypes.warning);
        } else {
            showAlert(alertMessages.unknown_error, alertTypes.error);
        }
        return response;
    } catch (error) {
        console.error(alertMessages.context_register_error, error);
    }
};
