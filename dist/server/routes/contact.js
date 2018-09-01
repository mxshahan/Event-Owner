'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _validateInput = require('../config/validateInput');

var _contact = require('../controllers/contact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/').options((0, _cors2.default)()).post((0, _validateInput.validateBody)(_validateInput.schemas.contact), _contact.contactUs);

exports.default = router;