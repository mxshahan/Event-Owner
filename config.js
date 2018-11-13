const api = {
    server: process.env.NODE_ENV === 'production' ? 'https://event-owner.herokuapp.com' : window.location.protocol + '//' + window.location.hostname + ':3000',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000',
    events: {
      type: ['Wedding', 'Bar/Bat', 'Bris', 'Birthday', 'Other']
    },
    social_auth: {
      google: {
        appId: '337114511124-44o17hnmqm4gjv0j16ree1e9q1bs2kdg.apps.googleusercontent.com',
        client_secret: '3s5I8aDxUBVm9cgWkUU9pXW0'
      },
      facebook: {
        appId: '447232409015149'
      }
    }
}

export default api;
