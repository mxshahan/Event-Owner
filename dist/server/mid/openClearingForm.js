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
var clearinFormData = {
    api_key: api_key,
    developer_email: developer_email,
    sum: 15,
    payment: 3,
    currency: 'ILS',
    successUrl: BASEURL + 'api/successAndInvoice'
};
var secretTransactionId = void 0;
var payment_data = void 0;

exports.default = function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'}); // http header
    // an helper function
    function _flushResponseEnd(txt) {
        res.write(txt); //write a response
        res.end();
    }

    var url = req.url;
    // payment_data.push(req.query);

    if (url.startsWith("/openClearingForm")) {
        payment_data = req.query;
        var p_data = req.query;
        _extends(clearinFormData, {
            sum: p_data.gift_amount,
            payment: p_data.num_of_payment
        });
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

        _request2.default.post(validateUrl, { json: validateData }, function (error, response, validateResponse) {
            if (validateResponse.success) {
                // console.log(payment_data);
                // if there is permission , create the invoices
                createDocFunction(validateResponse, payment_data).then(function (createDocResponse) {
                    // console.log('payment data', payment_data);
                    setPaymentData(payment_data, createDocResponse, res);
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


var createDocFunction = function createDocFunction(validateResponse, payment_data) {
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
            amount: payment_data.gift_amount,
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
};

// try {
//     events = await eventModel.findOne({ _id: req.body.eventId });
//     const author = await userModel.findOne({ _id: events.author });
//     if (events) {
//         payment_info = await paymentCrud.create(req.body);
//         events.gifts.push(payment_info);
//         author.gifts.push(payment_info);
//         await events.save();
//         await author.save();
//         // res.status(200).end()
//         // res.status(200).json(payment_info);
//         resolve(payment_info)
//     } else {
//         reject({ msg: 'No Event Found' })
//     }
// } catch (e) {
//     reject({ success: false })
// }


var setPaymentData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(data, createDocResponse, res) {
        var payment_info, events, author;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        payment_info = void 0, events = void 0, author = void 0;

                        console.log(data);

                        _context.prev = 2;
                        _context.next = 5;
                        return _event.eventModel.findOne({ _id: data.eventId });

                    case 5:
                        events = _context.sent;
                        _context.next = 8;
                        return _user.userModel.findOne({ _id: events.author });

                    case 8:
                        author = _context.sent;

                        if (!events) {
                            _context.next = 22;
                            break;
                        }

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
                        // res.status(200).end()
                        // res.status(200).json(payment_info);
                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: payment_info
                        }));
                        _context.next = 23;
                        break;

                    case 22:
                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: false
                        }));

                    case 23:
                        _context.next = 28;
                        break;

                    case 25:
                        _context.prev = 25;
                        _context.t0 = _context['catch'](2);

                        res.render('thankyou', _extends(createDocResponse, {
                            payment_info: false
                        }));

                    case 28:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 25]]);
    }));

    return function setPaymentData(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();