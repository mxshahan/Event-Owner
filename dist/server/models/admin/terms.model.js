'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.termsCrud = exports.termsModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _crud = require('../../config/crud');

var _crud2 = _interopRequireDefault(_crud);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var termsSchema = new _mongoose2.default.Schema({
    text: {
        type: String
    }
});

termsSchema.plugin(_mongooseUniqueValidator2.default);
termsSchema.plugin(_mongooseTimestamp2.default);

var termsModel = _mongoose2.default.model('termsModel', termsSchema);
var termsCrud = new _crud2.default(termsModel);

exports.termsModel = termsModel;
exports.termsCrud = termsCrud;