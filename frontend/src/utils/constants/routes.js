const routes = {
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    auth: '/auth',
    register: '/register',
    api: '/api',
    users: '/users',
    edit: '/edit',
    offer: '/offer',
    create: '/create',
    ownership: '/ownership',
    getMundialProgress: '/top-progress',
    getProgress: '/progress',
    detail: '/detail',
    home: '/',
    counteroffer: '/counteroffer',
    duplicated: '/duplicated',
    wishlist: '/wishlist',
    page: (page) => `?page=${page}`,
    offerId: (id) => `&offerId=${id}`
}

export default routes;