'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _user = require('../controllers/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isAuth } from '../mid/auth';
// const passportJWT = passport.authenticate('jwt', { session: false });
var router = (0, _expressPromiseRouter2.default)();

router.route('/login').post(_user.LoginUser);
router.route('/create').post(_user.createUser);
router.route('/me').get(_user.getUser);

exports.default = router;