const api = {
    server: process.env.NODE_ENV.includes('development') ? 'http://127.0.0.1:3000' : 'https://event-owner.herokuapp.com',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000'
}

export default api;