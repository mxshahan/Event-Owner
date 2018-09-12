'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STRIPE_SECRET_KEY = process.env.NODE_ENV.includes('production') ? 'sk_test_uE7kll2IiWs07ipIHaCBdKUa' : 'sk_test_uE7kll2IiWs07ipIHaCBdKUa';
var stripeConfig = (0, _stripe2.default)(STRIPE_SECRET_KEY);

// const DEV_URL = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'];
// const PROD_URL = ['https://event-owner.herokuapp.com', 'http://event-owner.herokuapp.com', 'http://127.0.0.1:3000'];
//
// const FRONTEND_URL = process.env.NODE_ENV === `production` ? PROD_URL : DEV_URL;

var config = {
    MONGO_URL: 'mongodb://root:123456a@ds153705.mlab.com:53705/eventowner',
    secret: 'helloWorld',
    nodemailer: {
        user: 'event.owner.fvr@gmail.com',
        pass: 'evnt@ownr2121'
    },
    stripe: stripeConfig

};

exports.default = config;