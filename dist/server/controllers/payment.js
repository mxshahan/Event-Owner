'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInvoice = exports.checkoutOnEvent = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _payment = require('../models/payment.model');

var _payment2 = _interopRequireDefault(_payment);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var stripe = _config2.default.stripe;
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
    var api_key, api_email, developer_email, developer_phone, url, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('api', req.body);
            // register to demo.ezcount.co.il to get your own test keys
            api_key = '4c4b3fd224e0943891588ea5a70d6cb566af3a5b4d506908ca04b30526234551';
            api_email = 'demo@ezcount.co.il';
            // DEVELOPER information, we will notify you for any API problem to this details

            developer_email = 'applicationreact@gmail.com';
            developer_phone = '008801752294542';
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
                price: req.body.success.amount / 100,
                //this price include the VAT
                vat_type: "PRE"
              }],
              payment: [{
                // bank transfer
                payment_type: 4,
                payment: req.body.success.amount / 100,
                comment: 'Transaction number is ' + req.body.success.balance_transaction
              }],
              // THIS IS A MUST ONLY IN INVOICE RECIEPT
              price_total: req.body.success.amount / 100,
              comment: "some general comment for the document"

              //actual send request for creating invoice
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

          case 8:
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