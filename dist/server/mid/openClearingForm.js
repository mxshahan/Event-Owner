'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENV_URL = 'https://demo.ezcount.co.il/';
var BASEURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/';
var api_key = 'f1c85d16fc1acd369a93f0489f4615d93371632d97a9b0a197de6d4dc0da51bf';
var developer_email = 'demo@demo.com';

var reqUrl = ENV_URL + 'api/payment/prepareSafeUrl/clearingFormForWeb';
var clearinFormData = {
    api_key: api_key,
    developer_email: developer_email,
    sum: 15,
    payment: 3,
    currency: 'ILS',
    successUrl: BASEURL + 'api/successAndInvoice'
};
var secretTransactionId = void 0;

exports.default = function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'}); // http header
    // an helper function
    function _flushResponseEnd(txt) {
        res.write(txt); //write a response
        res.end();
    }

    var url = req.url;

    if (url.startsWith("/openClearingForm")) {
        _request2.default.post(reqUrl, { json: clearinFormData }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // print to console the data received from this request. [ksys_token , url , secretTransactionId]
                // store the token for later validation
                secretTransactionId = body.secretTransactionId;
                // console.warn("secretTransactionId should be stored into session!")

                //redirect the user to the clearing form
                res.writeHead(302, {
                    'Location': body.url
                });
                res.end();
            } else {
                // console.error(error, response);
                _flushResponseEnd("Error opening clearing form, please check your console");
            }
        });
    } else if (url.startsWith('/successAndInvoice')) {
        // ensure there is a secretTransactionId, then continue creating the invoices

        //set the vars for validate request
        var validateUrl = ENV_URL + "/api/payment/validate/" + secretTransactionId;
        var validateData = {
            api_key: api_key,
            developer_email: developer_email
        };

        var validateRequest = {};
        var createDoc = {};
        _request2.default.post(validateUrl, { json: validateData }, function (error, response, validateResponse) {
            if (validateResponse.success) {
                // if there is permission , create the invoices
                createDocFunction(validateResponse).then(function (createDocResponse) {
                    res.render('thankyou', createDocResponse);
                    // res.status(200).json(createDocResponse)
                    // _flushResponseEnd(JSON.stringify(createDocResponse));
                });
            } else {
                res.render('thankyou', { success: false });

                // _flushResponseEnd('some problem in the validate request');
            }
        });
    } else {
        _flushResponseEnd('<h1>Wrong Page!<h1>'); //write a response
    }
};

// Creating Invoice


function createDocFunction(validateResponse) {
    var createDocData = {
        // CUSTOMER credentials
        api_key: api_key,
        developer_email: developer_email,
        type: 320 /*invoice receipt*/
        , description: '[DOCUMENT DESCRIPTION]',
        customer_name: '[CUSTOMER NAME HERE]',
        customer_email: '[CUSTOMER EMAIL HERE]',
        customer_address: '[CUSTOMER ADDRESS HERE]',
        item: [{
            catalog_number: 'MKT1',
            details: 'item 1 details',
            amount: 1,
            price: validateResponse.cgp_payment_total,
            vat_type: 'INC' //this price include the VAT
        }],
        payment: [{
            payment_type: 3 /*type CC*/
            , payment: validateResponse.cgp_payment_total, //the sum field
            cc_number: validateResponse.cgp_customer_cc_4_digits, //last 4 digits!!!
            cc_type_name: validateResponse.cgp_customer_cc_name,
            cc_deal_type: 1 /*no payments*/
        }],
        price_total: validateResponse.cgp_payment_total,
        comment: "[DOCUMENT COMMENT COMES HERE]",
        transaction_id: validateResponse.cgp_ksys_transacion_id,
        cgp_ids: [validateResponse.cgp_id],
        auto_balance: true /*in case the items sum is different then the total payments, we will add a discount, it helps solve cents calculations problem*/
    };

    var createDocUrl = ENV_URL + '/api/createDoc';
    return new Promise(function (resolve, reject) {
        _request2.default.post(createDocUrl, { json: createDocData }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body) // Print the shortened url.
                resolve(body);
            } else {
                // console.error("Failed");
                // console.error(error, response);
                reject(error);
            }
        });
    });
}