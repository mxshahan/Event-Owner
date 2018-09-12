const api = {
    server: process.env.NODE_ENV === 'production' ? 'https://event-owner.herokuapp.com' : 'http://127.0.0.1:3000',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000'
}

export default api;
