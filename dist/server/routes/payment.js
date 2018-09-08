'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _payment = require('../controllers/payment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/checkout').options((0, _cors2.default)()).post(_payment.checkoutOnEvent);

router.route('/invoice').options((0, _cors2.default)()).post(_payment.createInvoice);

exports.default = router;