'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STRIPE_SECRET_KEY = process.env.NODE_ENV.includes('production') ? 'sk_test_uE7kll2IiWs07ipIHaCBdKUa' : 'sk_test_uE7kll2IiWs07ipIHaCBdKUa';
var stripeConfig = (0, _stripe2.default)(STRIPE_SECRET_KEY);

var DEV_URL = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'];
var PROD_URL = ['https://event-owner.herokuapp.com/', 'http://event-owner.herokuapp.com/'];

var FRONTEND_URL = process.env.NODE_ENV.includes('production') ? PROD_URL : DEV_URL;

// Invoice data

// register to demo.ezcount.co.il to get your own test keys
var api_key = '4c4b3fd224e0943891588ea5a70d6cb566af3a5b4d506908ca04b30526234551';
var api_email = 'demo@ezcount.co.il';
// DEVELOPER information, we will notify you for any API problem to this details
var developer_email = 'applicationreact@gmail.com';
var developer_phone = '008801752294542';

var url = 'https://demo.ezcount.co.il/api/createDoc';

var invoice_data = {
    // CUSTOMER credentials
    api_key: api_key,
    api_email: api_email,
    // developer data
    developer_email: developer_email,
    developer_phone: developer_phone,
    // invoice reciept
    type: 320,
    description: "Monthly payment for service",
    customer_name: "customer name",
    customer_email: "client@demo.com",
    customer_address: "Full customer address, city, and house num 42",
    item: [{
        catalog_number: "MKT1",
        details: "item details",
        amount: 1,
        price: 255,
        //this price include the VAT
        vat_type: "PRE"
    }],
    payment: [{
        // bank transfer
        payment_type: 4,
        payment: 255,
        comment: "transaction number is 23423423"
    }],
    // THIS IS A MUST ONLY IN INVOICE RECIEPT
    price_total: 255,
    comment: "some general comment for the document"
};

var config = {
    MONGO_URL: 'mongodb://root:123456a@ds153705.mlab.com:53705/eventowner',
    secret: 'helloWorld',
    nodemailer: {
        user: 'event.owner.fvr@gmail.com',
        pass: 'evnt@ownr2121'
    },
    stripe: stripeConfig,
    FRONTEND_URL: FRONTEND_URL,
    data: invoice_data,
    url: url

};

exports.default = config;