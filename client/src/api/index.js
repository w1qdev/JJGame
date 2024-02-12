export const endpoints = {
    SERVER_ORIGIN_URI: "http://localhost:5000",
    PRODUCTS: {
        ROUTE: '/api/products',
        GET_ALL: '/'
    },
    ORDERS: {
        ROUTE: '/api/orders',
        MAKE_ORDER: '/create',
        REMOVE_ITEM: '/remove-item',
        REMOVE_ALL: '/remove-all',
        GET_ORDERS: '/'
    },
    USERS: {
        ROUTE: '/api/users',
        CREATE: '/create',
        SIGNIN: '/signin'
    }
}