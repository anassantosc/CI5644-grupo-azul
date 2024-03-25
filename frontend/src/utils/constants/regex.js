const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^[a-zA-Z0-9.\-_]{8,}$/,
    username: /^[a-zA-Z\s]{5,}$/,
};

export default regex;