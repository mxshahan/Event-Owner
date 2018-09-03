'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _validateInput = require('../config/validateInput');

var _event = require('../controllers/event');

var _auth = require('../mid/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/').get(_event.getAllEvent);

router.route('/create').options((0, _cors2.default)()).post((0, _validateInput.validateBody)(_validateInput.schemas.events), _auth.isAuth, _event.createEvent);

router.route('/MY_EVENTS').options((0, _cors2.default)()).get(_auth.isAuth, _event.getEvent);

router.route('/:id').get(_event.getSingleEvent).options((0, _cors2.default)()).put(_auth.isAuth, (0, _validateInput.validateBody)(_validateInput.schemas.events), _event.updateEvent).delete(_auth.isAuth, _event.deleteEvent);

exports.default = router;