const api = {
    server: process.env.NODE_ENV === 'production' ? 'https://event-owner.herokuapp.com' : window.location.protocol + '//' + window.location.hostname + ':3000',
    dev: 'http://127.0.0.1:3000',
    siteurl: 'http://127.0.0.1:3000',
    events: {
      type: ['Wedding', 'Bar/Bat', 'Bris', 'Birthday', 'Other']
    },
    social_auth: {
      google: {
        appId: '498960392485-tuoue88o7kt3kjt841ni1tr3vn2qkolh.apps.googleusercontent.com',
        client_secret: 'mVeyefoC_3CwLLCBy2JYNC_-'
      },
      facebook: {
        appId: '447232409015149'
      }
    }
}

export default api;
