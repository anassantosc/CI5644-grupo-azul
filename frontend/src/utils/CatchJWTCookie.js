const catchJWTCookie = (cookies) => {
    const regex = /JWT=.*;*/g;
    const found = cookies.match(regex);

    return found ? found[0].replace(/JWT=|;/g, "") : null;
};

export default catchJWTCookie;
