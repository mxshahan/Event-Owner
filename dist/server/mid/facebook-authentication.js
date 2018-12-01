'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyFacebook = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var verifyFacebook = exports.verifyFacebook = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('hhh');
                        _passport2.default.use(new _passportFacebook2.default({
                            clientID: _config2.default.social.facebook.clientID,
                            clientSecret: _config2.default.social.facebook.clientSecret,
                            callbackURL: "/api/user/facebook-login-success"
                        }, function (accessToken, refreshToken, profile, done) {
                            console.log(profile);
                        }));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function verifyFacebook(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
exports.default = verifyFacebook;