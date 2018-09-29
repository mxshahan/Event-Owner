'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.faqCrud = exports.faqModel = undefined;

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

var faqSchema = new _mongoose2.default.Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    }
});

faqSchema.plugin(_mongooseUniqueValidator2.default);
faqSchema.plugin(_mongooseTimestamp2.default);

var faqModel = _mongoose2.default.model('faqModel', faqSchema);
var faqCrud = new _crud2.default(faqModel);

exports.faqModel = faqModel;
exports.faqCrud = faqCrud;