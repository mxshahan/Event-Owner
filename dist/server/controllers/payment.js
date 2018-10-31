'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWithdraw = exports.getWithdraw = exports.reqWithdraw = exports.ValidatePayment = exports.ClearFund = exports.setPaymentData = exports.createInvoice = exports.checkoutOnEvent = undefined;

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

var api_key = 'f1c85d16fc1acd369a93f0489f4615d93371632d97a9b0a197de6d4dc0da51bf';
var api_email = 'demo@ezcount.co.il';
// DEVELOPER information, we will notify you for any API problem to this details
var developer_email = 'applicationreact@gmail.com';
var developer_phone = '1234567890';
var secretTransactionId = null;
var BASEURL = 'http://localhost:3000';

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
              api_key: api_key,
              developer_email: developer_email,
              sum: 15,
              payment: 3,
              currency: 'ILS',
              successUrl: BASEURL + '/api/payment/successAndInvoice'
            };

            _request2.default.post(url, { form: data, json: true }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                // console.log(body) // Print the shortened url.
                secretTransactionId = body.secretTransactionId;
                res.writeHead(302, {
                  'Location': body.url
                });
                res.end();
                // res.status(200).json(body);
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

var ValidatePayment = exports.ValidatePayment = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var validateUrl, validateData;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('Successfull');
            //set the vars for validate request
            validateUrl = 'https://demo.ezcount.co.il/api/payment/validate/' + secretTransactionId;
            validateData = {
              api_key: api_key,
              developer_email: developer_email
            };


            _request2.default.post(validateUrl, { json: validateData }, function (error, response, validateResponse) {
              if (!error && response.statusCode == 200) {
                // console.log(body) // Print the shortened url.
                res.status(200).json(validateResponse);
              } else {
                console.error("Failed");
                console.error(error, response);
              }
            });

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function ValidatePayment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var reqWithdraw = exports.reqWithdraw = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var withdrawn, user;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            withdrawn = void 0;

            if (req.user.type !== 'admin') delete req.body.approved;
            _context6.prev = 2;
            _context6.next = 5;
            return _user.userModel.findOne({
              _id: req.user._id
            }).populate('gifts');

          case 5:
            user = _context6.sent;

            if (!(req.body.amount <= user.netBalance())) {
              _context6.next = 22;
              break;
            }

            _context6.prev = 7;
            _context6.next = 10;
            return _withdrawal.withdrawalModel.create({
              amount: req.body.amount,
              withdrawn_by: req.user._id
            });

          case 10:
            withdrawn = _context6.sent;


            user.withdrawn.push(withdrawn);
            _context6.next = 14;
            return user.save();

          case 14:
            res.status(200).json(_extends({
              success: true
            }, withdrawn._doc));
            _context6.next = 20;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6['catch'](7);

            res.status(403).json(_context6.t0);

          case 20:
            _context6.next = 23;
            break;

          case 22:
            res.status(203).json({
              success: false,
              msg: 'You have insufficient balance '
            });

          case 23:
            _context6.next = 28;
            break;

          case 25:
            _context6.prev = 25;
            _context6.t1 = _context6['catch'](2);

            res.status(422).json(_context6.t1);

          case 28:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[2, 25], [7, 17]]);
  }));

  return function reqWithdraw(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var getWithdraw = exports.getWithdraw = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var withdraw;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            withdraw = void 0;
            _context7.prev = 1;
            _context7.next = 4;
            return _withdrawal.withdrawalModel.find().populate({
              path: 'withdrawn_by',
              populate: {
                path: '-password',
                model: 'userModel'
              }
            });

          case 4:
            withdraw = _context7.sent;

            res.status(200).json(withdraw);
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](1);

            res.status(422).json(_context7.t0);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 8]]);
  }));

  return function getWithdraw(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var updateWithdraw = exports.updateWithdraw = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    var dts;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(req.user.type === 'admin')) {
              _context8.next = 11;
              break;
            }

            _context8.prev = 1;
            _context8.next = 4;
            return _withdrawal.withdrawalCrud.put({
              params: {
                qr: { _id: req.params.id }
              },
              body: {
                approved: true
              }
            });

          case 4:
            dts = _context8.sent;

            res.status(200).json(dts);
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](1);

            res.status(422).json(_context8.t0);

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 8]]);
  }));

  return function updateWithdraw(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();