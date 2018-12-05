'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _affiliate = require('./affiliate');

var _affiliate2 = _interopRequireDefault(_affiliate);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _payment = require('./payment');

var _payment2 = _interopRequireDefault(_payment);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/api/user', _user2.default);
  app.use('/api/affiliate', _affiliate2.default);
  app.use('/api/event', _event2.default);
  app.use('/api/contact', _contact2.default);
  app.use('/api/payment', _payment2.default);
  app.use('/api/admin', _admin2.default);
};