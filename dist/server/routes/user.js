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

var _file = require('../mid/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const passportJWT = passport.authenticate('jwt', { session: false });

// import passport from 'passport';
var router = (0, _expressPromiseRouter2.default)();

router.route('/login').options((0, _cors2.default)()).post(_user.LoginUser);
router.route('/create').options((0, _cors2.default)()).post(_user.createUser);
router.route('/me/:username').get(_user.getUser);
router.route('/delete/:username').options((0, _cors2.default)()).delete(_auth.isAuth, _user.deleteUser);
router.route('/check').options((0, _cors2.default)()).get(_user.checkUser);
router.route('/all').options((0, _cors2.default)()).get(_auth.isAuth, _user.getAllUser);
router.route('/upload').options((0, _cors2.default)()).post(_auth.isAuth, _file.fileUploadMiddlware, _user.fileUpload);

exports.default = router;