import { AlertProvider } from "../context/AlertContext";
import "./../../styles/global.css";
import PropTypes from "prop-types";

export default function MyApp({ Component, pageProps }) {
    return (

        <AlertProvider>
            <Component {...pageProps} />
        </AlertProvider>

    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
