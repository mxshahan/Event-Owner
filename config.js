const api = {
    server: process.env.NODE_ENV === 'production' ? 'https://event-owner.herokuapp.com' : window.location.protocol + '//' + window.location.hostname + ':3000',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000',
    events: {
      type: ['Wedding', 'Bar/Bat', 'Bris', 'Birthday', 'Other']
    }
}

export default api;
