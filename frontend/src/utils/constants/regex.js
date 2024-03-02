const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^[a-zA-Z\.\-\_]{8,}$/,
    username: /^[a-zA-Z\s]{5,}$/,
};

export default regex;