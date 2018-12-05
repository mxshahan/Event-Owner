'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _affiliate = require('../controllers/affiliate');

var _auth = require('../mid/auth');

var _file = require('../mid/file');

var _facebookAuthentication = require('../mid/facebook-authentication');

var _facebookAuthentication2 = _interopRequireDefault(_facebookAuthentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isRegistered } from '../mid/Affiliate';
// import passport from 'passport';
// const passportFacebook = passport.authenticate('facebook');
var router = (0, _expressPromiseRouter2.default)();
// import passport from 'passport';


router.route('/login').options((0, _cors2.default)()).post(_affiliate.LoginAffiliate);

router.route('/create').options((0, _cors2.default)()).post(_affiliate.createAffiliate);

router.route('/').options((0, _cors2.default)()).put(_auth.isAuth, _affiliate.updateAffiliate);

router.route('/me').get(_auth.isAuth, _affiliate.getMyAccount);

router.route('/delete/:username').options((0, _cors2.default)()).delete(_auth.isAuth, _affiliate.deleteAffiliate);

router.route('/facebook-login').options((0, _cors2.default)()).post(_affiliate.facebookLogin);

router.route('/facebook-login-success').get(_affiliate.facebookSuccessLogin);

router.route('/facebook-register').options((0, _cors2.default)()).post(_affiliate.facebookRegister);

router.route('/google-login').options((0, _cors2.default)()).post(_affiliate.googleLogin);

router.route('/check').options((0, _cors2.default)()).get(_affiliate.checkAffiliate);

router.route('/all').options((0, _cors2.default)()).get(_auth.isAuth, _affiliate.getAllAffiliate);

router.route('/upload').options((0, _cors2.default)()).post(_auth.isAuth, _file.fileUploadMiddlware, _affiliate.fileUpload);

router.route('/:username').get(_affiliate.getAffiliate);

exports.default = router;