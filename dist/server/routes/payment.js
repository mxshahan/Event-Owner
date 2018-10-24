'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _payment = require('../controllers/payment');

var _auth = require('../mid/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/checkout').options((0, _cors2.default)()).post(_payment.checkoutOnEvent);

router.route('/invoice').options((0, _cors2.default)()).post(_payment.createInvoice);

// Saving Payment Data To Database
router.route('/setdata/:id').options((0, _cors2.default)()).post(_payment.setPaymentData);

router.route('/clear_fund/:id').options((0, _cors2.default)()).get(_payment.ClearFund);

router.route('/withdraw').options((0, _cors2.default)()).get(_payment.getWithdraw).post(_auth.isAuth, _payment.reqWithdraw);

exports.default = router;