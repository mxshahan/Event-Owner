'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _admin = require('../controllers/admin');

var _auth = require('../mid/auth');

var _file = require('../mid/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import passport from 'passport';
var router = (0, _expressPromiseRouter2.default)();

// router.route('/')
// .get(getAllAdmin)

router.route('/count').options((0, _cors2.default)()).get(_auth.isAuth, _admin.getAllCount);

router.route('/login').options((0, _cors2.default)()).post(_admin.loginAdmin);

router.route('/create').options((0, _cors2.default)()).post(_admin.getAdmin, _admin.createAdmin);

router.route('/me').get(_auth.isAuth, _admin.getAdminData);

router.route('/update').options((0, _cors2.default)()).put(_auth.isAuth, _admin.updateAdmin);

// Route For Contact Page
router.route('/contact').get(_admin.getContactInfo);

// Route For Contact Page
router.route('/contact/update').options((0, _cors2.default)()).post(_auth.isAuth, _admin.updateContactInfo);

// Route For GET MailTo
router.route('/mailto').get(_auth.isAuth, _admin.getMailTo);

// Route For MailTo Page
router.route('/mailto/update').options((0, _cors2.default)()).post(_auth.isAuth, _admin.updateMailTo);

// Route For GET Charges
router.route('/charges').get(_auth.isAuth, _admin.getCharges);

// Route For MailTo Page
router.route('/charges/update').options((0, _cors2.default)()).post(_auth.isAuth, _admin.updateCharges);

//  GET Terms
router.route('/terms').get(_auth.isAuth, _admin.getTerms);

// Route For MailTo Page
router.route('/terms/update').options((0, _cors2.default)()).post(_auth.isAuth, _admin.updateTerms);

// GET FAQ
router.route('/faq').get(_admin.getFAQ);

// CREATE FAQ
router.route('/faq/create').options((0, _cors2.default)()).post(_auth.isAuth, _admin.createFAQ);

// DELETE FAQ
router.route('/faq/delete/:id').options((0, _cors2.default)()).delete(_auth.isAuth, _admin.deleteFAQ);

// UPDATE FAQ
router.route('/faq/update').options((0, _cors2.default)()).post(_auth.isAuth, _admin.updateFAQ);

exports.default = router;