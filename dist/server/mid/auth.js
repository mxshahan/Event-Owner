'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var payload = void 0;
var token = void 0;

var isAuth = exports.isAuth = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.auth;
            _context.prev = 1;
            _context.next = 4;
            return (0, _auth.jwtVerify)(token);

          case 4:
            payload = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);
            throw _context.t0.message;

          case 10:
            _context.prev = 10;

            if (payload) {
              _context.next = 13;
              break;
            }

            throw { message: 'Token has expired' };

          case 13:
            req.user = payload;
            next();
            return _context.finish(10);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 7, 10, 16]]);
  }));

  return function isAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();