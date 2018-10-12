'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contactUs = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _contact = require('../models/contact.model');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var contactUs = exports.contactUs = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var cnf, transporter, body, mailOptions;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        cnf = void 0;
                        _context.prev = 2;
                        _context.next = 5;
                        return mailtoModel.get();

                    case 5:
                        cnf = _context.sent;
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        cnf = _config2.default;

                    case 11:
                        transporter = _nodemailer2.default.createTransport({
                            service: 'gmail',
                            auth: {
                                user: cnf.email || _config2.default.nodemailer.user,
                                pass: cnf.password || _config2.default.nodemailer.pass
                            }
                        });
                        _context.next = 14;
                        return _contact.contactCrud.create(req.body);

                    case 14:
                        body = _context.sent;
                        mailOptions = {
                            from: req.body.email,
                            to: cnf[0].email || _config2.default.nodemailer.user, // Admin Email Will Be Here
                            subject: req.body.name + ' sent a message',
                            html: '\n              <h2><b>Name:</b> ' + req.body.name + '</h2>\n              <p><b>Email:</b> ' + req.body.email + '</p>\n              <p><b>Phone: </b>' + req.body.phone + '</p>\n              <p>' + req.body.message + '</p>\n            '
                        };


                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.status(201).json({
                            success: true
                        });
                        _context.next = 23;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t1 = _context['catch'](0);

                        res.status(422).json({
                            success: false
                        });

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 20], [2, 8]]);
    }));

    return function contactUs(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();