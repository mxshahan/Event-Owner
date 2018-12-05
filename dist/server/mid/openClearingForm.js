'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _event = require('../models/event.model');

var _user = require('../models/user.model');

var _payment = require('../models/payment.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ENV_URL = 'https://demo.ezcount.co.il/';
var BASEURL = process.env.NODE_ENV === 'production' ? 'https://event-owner.herokuapp.com/' : 'http://localhost:3000/';
var api_key = 'f1c85d16fc1acd369a93f0489f4615d93371632d97a9b0a197de6d4dc0da51bf';
var developer_email = 'demo@demo.com';

var reqUrl = ENV_URL + 'api/payment/prepareSafeUrl/clearingFormForWeb';
var secretTransactionId = void 0;
var payment_data = void 0;
var pdt = [];

exports.default = function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'}); // http header
    // an helper function
    function _flushResponseEnd(txt) {
        res.write(txt); //write a response
        res.end();
    }

    var url = req.url;
    pdt.push(req.query);
    payment_data = pdt[0];

    if (url.startsWith("/openClearingForm")) {
        initClearingForm().then(function (resData) {
            processClearingForm(resData);
        });
    } else if (url.startsWith('/successAndInvoice')) {
        successClearingForm();
    }
    // else {
    //     _flushResponseEnd('<h1>Wrong Page!<h1>'); //write a response
    // }

    function initClearingForm() {
        return new Promise(function (resolve, reject) {
            var clearingFormData = {
                api_key: api_key,
                developer_email: developer_email,
                sum: 15,
                currency: 'ILS',
                successUrl: BASEURL + 'api/successAndInvoice',
                payments: '8-8'
            };
            resolve(clearingFormData);
        });
    }

    function processClearingForm(resData) {
        _request2.default.post(reqUrl, { json: resData }, function (error, response, body) {
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
    }

    function successClearingForm() {
        // ensure there is a secretTransactionId, then continue creating the invoices

        //set the vars for validate request
        var validateUrl = ENV_URL + "/api/payment/validate/" + secretTransactionId;
        var validateData = {
            api_key: api_key,
            developer_email: developer_email
        };

        _request2.default.post(validateUrl, { json: validateData }, function (error, response, validateResponse) {
            if (validateResponse.success) {
                // console.log(payment_data);
                // if there is permission , create the invoices
                createDocFunction(validateResponse, payment_data).then(function (createDocResponse) {
                    setPaymentData(payment_data, createDocResponse, res);
                    // res.status(200).json(createDocResponse)
                    // _flushResponseEnd(JSON.stringify(createDocResponse));
                });
            } else {
                res.render('thankyou', { success: false });
                // _flushResponseEnd('some problem in the validate request');
            }
        });
    }
};

// Creating Invoice


var createDocFunction = function createDocFunction(validateResponse, payment_data) {
    // console.log('33f', payment_data)
    var createDocData = {
        // CUSTOMER credentials
        api_key: api_key,
        developer_email: developer_email,
        type: 320 /*invoice receipt*/
        , description: payment_data.description,
        customer_name: payment_data.firstname + ' ' + payment_data.lastname,
        customer_email: payment_data.email,
        customer_address: payment_data.address,
        item: [{
            catalog_number: 'MKT1',
            details: 'item 1 details',
            amount: validateResponse.cgp_num_of_payments,
            price: validateResponse.cgp_payment_total,
            vat_type: 'INC' //this price include the VAT
        }],
        payment: [{
            payment_type: 3 /*type CC*/
            , payment: payment_data.total_fee, //validateResponse.cgp_payment_total, //the sum field
            cc_number: validateResponse.cgp_customer_cc_4_digits, //last 4 digits!!!
            cc_type_name: validateResponse.cgp_customer_cc_name,
            cc_deal_type: 1 /*no payments*/
        }],
        price_total: payment_data.total_fee, //validateResponse.cgp_payment_total,
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
                console.error(error, response);
                reject(error);
            }
        });
    });
};

var setPaymentData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(data, createDocResponse, res) {
        var payment_info, events, author;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // console.log('ee55', data)
                        payment_info = void 0, events = void 0, author = void 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return _event.eventModel.findOne({ _id: data.eventId });

                    case 4:
                        events = _context.sent;
                        _context.next = 7;
                        return _user.userModel.findOne({ _id: events.author });

                    case 7:
                        author = _context.sent;

                        if (!events) {
                            _context.next = 27;
                            break;
                        }

                        _context.prev = 9;
                        _context.next = 12;
                        return _payment.paymentCrud.create(data);

                    case 12:
                        payment_info = _context.sent;


                        events.gifts.push(payment_info);
                        author.gifts.push(payment_info);
                        _context.next = 17;
                        return events.save();

                    case 17:
                        _context.next = 19;
                        return author.save();

                    case 19:

                        // console.log('33ee55', payment_info, createDocResponse)   

                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: payment_info
                        }));
                        _context.next = 25;
                        break;

                    case 22:
                        _context.prev = 22;
                        _context.t0 = _context['catch'](9);

                        // console.log('eee', e)
                        res.send('Erro Found...! If you think your payment clear plese contact us in contact page. Thanks');

                    case 25:
                        _context.next = 28;
                        break;

                    case 27:
                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: 0
                        }));

                    case 28:
                        _context.next = 33;
                        break;

                    case 30:
                        _context.prev = 30;
                        _context.t1 = _context['catch'](1);

                        // console.log('656565', e)
                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: false
                        }));

                    case 33:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 30], [9, 22]]);
    }));

    return function setPaymentData(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();