'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWithdraw = exports.reqWithdraw = exports.ClearFund = exports.setPaymentData = exports.createInvoice = exports.checkoutOnEvent = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _payment = require('../models/payment.model');

var _event = require('../models/event.model');

var _user = require('../models/user.model');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _withdrawal = require('../models/withdrawal.model');

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
    var payment_info, events, author;
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
            _context3.next = 7;
            return _user.userModel.findOne({ _id: events.author });

          case 7:
            author = _context3.sent;

            if (!events) {
              _context3.next = 21;
              break;
            }

            _context3.next = 11;
            return _payment.paymentCrud.create(req.body);

          case 11:
            payment_info = _context3.sent;

            events.gifts.push(payment_info);
            author.gifts.push(payment_info);
            _context3.next = 16;
            return events.save();

          case 16:
            _context3.next = 18;
            return author.save();

          case 18:
            res.status(200).end();
            // res.status(200).json(payment_info);
            _context3.next = 22;
            break;

          case 21:
            res.status(404).json({ msg: 'No Event Found' });

          case 22:
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3['catch'](1);

            res.status(422).json({
              success: false
            });

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 24]]);
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
              api_key: 'f1c85d16fc1acd369a93f0489f4615d93371632d97a9b0a197de6d4dc0da51bf',
              developer_email: developer_email,
              sum: 150,
              successUrl: 'https://google.com',
              payments: '4-4'

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
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function ClearFund(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var reqWithdraw = exports.reqWithdraw = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var withdrawn, user;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            withdrawn = void 0;

            if (req.user.type !== 'admin') delete req.body.approved;
            _context5.prev = 2;
            _context5.next = 5;
            return _user.userModel.findOne({
              _id: req.user._id
            }).populate('gifts');

          case 5:
            user = _context5.sent;

            if (!(req.body.amount <= user.netBalance())) {
              _context5.next = 16;
              break;
            }

            _context5.next = 9;
            return _withdrawal.withdrawalCrud.create({
              amount: req.body.amount,
              withdrawn_by: req.user._id
            });

          case 9:
            withdrawn = _context5.sent;


            user.withdrawn.push(withdrawn);
            _context5.next = 13;
            return user.save();

          case 13:
            res.status(200).json(_extends({
              success: true
            }, withdrawn._doc));
            _context5.next = 17;
            break;

          case 16:
            res.status(203).json({
              success: false,
              msg: 'You have insufficient balance '
            });

          case 17:
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5['catch'](2);

            res.status(422).json(_context5.t0);

          case 22:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[2, 19]]);
  }));

  return function reqWithdraw(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var getWithdraw = exports.getWithdraw = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var withdraw;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            withdraw = void 0;
            _context6.prev = 1;
            _context6.next = 4;
            return _withdrawal.withdrawalCrud.get({
              populate: {
                path: 'withdrawn_by',
                populate: {
                  path: '-password',
                  model: 'userModel'
                }
              }
            });

          case 4:
            withdraw = _context6.sent;

            res.status(200).json(withdraw);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);

            res.status(422).json(_context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 8]]);
  }));

  return function getWithdraw(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();