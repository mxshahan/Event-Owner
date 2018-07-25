'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _config = require('./../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var passport = require('passport');
//find the user from token 
var JWTStrategy = require('passport-jwt').Strategy;
//this is for get token frn header

var _require = require('passport-jwt'),
    ExtractJwt = _require.ExtractJwt;

var LocalStrategy = require('passport-local').Strategy;


var isAuthenticated = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            token = ctx.request.headers.authorization;
            _context.next = 4;
            return jwtVerify(token);

          case 4:
            decode = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            ctx.throw(401, _context.t0.message);

          case 10:
            _context.prev = 10;

            if (!decode) {
              ctx.throw(401, { message: 'Token has expired' });
            }
            ctx.state.user = decode;
            _context.next = 15;
            return next();

          case 15:
            return _context.finish(10);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7, 10, 16]]);
  }));

  return function isAuthenticated(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//JSON WEB TOKEN STRATEGY (authenticate using token)
passport.use("jwt", new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('auth'),
  secretOrKey: _config2.default.JWT_SECRET
}, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(payload, done) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(payload);
            // try {
            //     const user = await User.findById(payload.sub, "_id");
            //     if (!user) {
            //         return done(null, false);
            //     }
            //     done(null, user);
            // } catch (err) {
            //     done(err, false)
            // }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));

// passport.use("local", new LocalStrategy({
//     usernameField: 'email'
// }, async(email, password, done) => {
//     let isMatch;
//     let user;
//     try {
//         user = await User.findOne( {email} );
//     } catch (error) {
//         done(error, false);
//     } finally {
//         if (!user) {
//             return done(null, false)
//         }
//         isMatch = await user.isValidPassword(password);
//         if (!isMatch) {
//             console.log('Not Match')
//             return done(null, false)
//         }
//         done(null, user)
//     }
// }));