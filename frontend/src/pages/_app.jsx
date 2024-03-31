import { AlertProvider } from "../context/AlertContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./../../styles/global.css";
import PropTypes from "prop-types";

export default function MyApp({ Component, pageProps }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </LocalizationProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
