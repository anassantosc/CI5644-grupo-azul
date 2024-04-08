const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^[a-zA-Z0-9.\-_]{8,}$/,
    username: /^[a-zA-Z\s]{5,}$/,
    cardNumber: /^[0-9]{13,16}$/,
    experationDate: /^(\d{4})-(\d{2})$/,
    cvv: /^[0-9]{3,4}$/,
};

export default regex;