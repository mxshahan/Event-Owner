'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearFund = exports.setPaymentData = exports.createInvoice = exports.checkoutOnEvent = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _payment = require('../models/payment.model');

var _event = require('../models/event.model');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var stripe = _config2.default.stripe;

// register to demo.ezcount.co.il to get your own test keys

var api_key = '4c4b3fd224e0943891588ea5a70d6cb566af3a5b4d506908ca04b30526234551';
var api_email = 'demo@ezcount.co.il';
// DEVELOPER information, we will notify you for any API problem to this details
var developer_email = 'applicationreact@gmail.com';
var developer_phone = '008801752294542';

var checkoutOnEvent = exports.checkoutOnEvent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(req.body)
            stripe.customers.create({
              email: req.body.token.email,
              source: req.body.token.id
            }).then(function (customer) {
              stripe.charges.create({
                amount: req.body.amount,
                description: req.body.description,
                currency: req.body.currency,
                customer: customer.id
              }, function (err, response) {
                if (err) res.status(500).json({ error: err });
                res.status(200).json({ success: response });
              });
            });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function checkoutOnEvent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createInvoice = exports.createInvoice = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var url, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'https://demo.ezcount.co.il/api/createDoc';
            data = {
              // CUSTOMER credentials
              api_key: api_key,
              api_email: api_email,
              // developer data
              developer_email: developer_email,
              developer_phone: developer_phone,
              // invoice reciept
              type: 320,
              description: req.body.success.description,
              customer_name: req.body.customer_name,
              customer_email: req.body.success.source.name,
              customer_address: req.body.billingAddress,
              item: [{
                catalog_number: req.body.success.created,
                details: req.body.success.description,
                amount: 1,
                price: req.body.fee,
                //this price include the VAT
                vat_type: "PRE"
              }],
              payment: [{
                // bank transfer
                payment_type: 4,
                payment: req.body.fee,
                comment: 'Transaction number is ' + req.body.success.balance_transaction
              }],
              // THIS IS A MUST ONLY IN INVOICE RECIEPT
              price_total: req.body.fee,
              comment: "some general comment for the document"

              // actual send request for creating invoice
            };
            _request2.default.post(url, { form: data, json: true }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                // console.log(body) // Print the shortened url.
                res.status(200).json(body);
              } else {
                console.error("Failed");
                console.error(error, response);
              }
            });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createInvoice(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var setPaymentData = exports.setPaymentData = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var payment_info, events;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            payment_info = void 0, events = void 0;
            _context3.prev = 1;
            _context3.next = 4;
            return _event.eventModel.findOne({ _id: req.body.eventId });

          case 4:
            events = _context3.sent;

            if (!events) {
              _context3.next = 14;
              break;
            }

            _context3.next = 8;
            return _payment.paymentCrud.create(req.body);

          case 8:
            payment_info = _context3.sent;

            events.gifts.push(payment_info._id);
            events.save();
            res.status(200).end();
            // res.status(200).json(payment_info);
            _context3.next = 15;
            break;

          case 14:
            res.status(404).json({ msg: 'No Event Found' });

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3['catch'](1);

            res.status(422).json({
              success: false
            });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 17]]);
  }));

  return function setPaymentData(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var ClearFund = exports.ClearFund = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var url, data;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = 'https://demo.ezcount.co.il/api/payment/prepareSafeUrl/clearingFormForWeb';
            data = {
              api_key: api_key,
              developer_email: developer_email,
              sum: 150,
              successUrl: 'https%3A%2F%2Fexample.com%2Fsuccess'
            };

            _request2.default.post(url, { form: data, json: true }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body); // Print the shortened url.
                res.status(200).json(body);
              } else {
                console.error("Failed");
                console.error(error, response);
              }
            });

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function ClearFund(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();