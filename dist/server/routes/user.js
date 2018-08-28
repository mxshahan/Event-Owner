'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _user = require('../controllers/user');

var _auth = require('../mid/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const passportJWT = passport.authenticate('jwt', { session: false });
var router = (0, _expressPromiseRouter2.default)();
// import passport from 'passport';


router.route('/login').options((0, _cors2.default)()).post(_user.LoginUser);
router.route('/create').options((0, _cors2.default)()).post(_user.createUser);
router.route('/me').get(_auth.isAuth, _user.getUser);
router.route('/check').options((0, _cors2.default)()).get(_user.checkUser);
router.route('/all').options((0, _cors2.default)()).get(_user.getAllUser);

exports.default = router;