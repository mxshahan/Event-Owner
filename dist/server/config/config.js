'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' ? 'sk_test_uE7kll2IiWs07ipIHaCBdKUa' : 'sk_test_uE7kll2IiWs07ipIHaCBdKUa';
var stripeConfig = (0, _stripe2.default)(STRIPE_SECRET_KEY);
var MONGO_URL = process.env.NODE_ENV === 'production' ? 'mongodb://root:123456a@ds153705.mlab.com:53705/eventowner' : 'mongodb://127.0.0.1:27017/eventowner';

// const MONGO_URL = 'mongodb://root:123456a@ds153705.mlab.com:53705/eventowner';

var config = {
    MONGO_URL: MONGO_URL,
    secret: 'helloWorld',
    nodemailer: {
        email: 'event.owner.fvr@gmail.com',
        password: 'evnt@ownr2121'
    },
    stripe: stripeConfig
};

exports.default = config;