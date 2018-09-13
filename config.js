const api = {
    server: process.env.NODE_ENV.includes('production') ? '' : 'http://127.0.0.1:3000',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000'
}

export default api;
