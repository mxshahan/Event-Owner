'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isRegistered = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _user = require('../models/user.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var user = void 0;

var isRegistered = exports.isRegistered = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user.userModel.findOne({
                            $or: [{
                                email: req.body.email
                            }, {
                                social: {
                                    facebook: {
                                        id: req.body.userId
                                    }
                                }
                            }]

                        });

                    case 3:
                        user = _context.sent;

                        if (!user) {
                            res.status(203).json({
                                msg: 'You are not registered. Please register first',
                                success: false
                            });
                        } else {
                            req.user = user;
                            next();
                        }
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        res.status(500).json({
                            msg: 'Failed to login',
                            success: false,
                            error: _context.t0
                        });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function isRegistered(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();