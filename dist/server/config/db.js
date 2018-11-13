'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_config2.default.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
} catch (err) {
  _mongoose2.default.createConnection(_config2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', function () {
  return console.log("MongoDB is Running..");
}).on('error', function (e) {
  throw e;
});